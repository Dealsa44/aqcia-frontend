// Service Worker for PWA Auto-Update System
// Version: 1.0.0

const CACHE_NAME = 'markets-app-v1';
const STATIC_CACHE_NAME = 'markets-static-v1';
const DYNAMIC_CACHE_NAME = 'markets-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/GroceryCompare.ico',
  '/manifest.json'
];

// Files that should use network-first strategy
const NETWORK_FIRST_PATTERNS = [
  /\.html$/,
  /\.js$/,
  /\.css$/,
  /\.json$/
];

// Files that should use cache-first strategy
const CACHE_FIRST_PATTERNS = [
  /\.(png|jpg|jpeg|gif|svg|ico|webp)$/,
  /\.(woff|woff2|ttf|eot)$/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different caching strategies based on file type
  if (shouldUseNetworkFirst(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (shouldUseCacheFirst(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy for HTML, JS, CSS files
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Clone the response before caching
    const responseToCache = networkResponse.clone();
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    // Fallback to cache if network fails
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Cache-first strategy for images and fonts
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch:', request.url, error);
    throw error;
  }
}

// Stale-while-revalidate strategy for other files
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE_NAME);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Ignore network errors for background updates
  });
  
  // Return cached response immediately if available
  return cachedResponse || fetchPromise;
}

// Helper functions to determine caching strategy
function shouldUseNetworkFirst(request) {
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(request.url));
}

function shouldUseCacheFirst(request) {
  return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(request.url));
}

// Message handling for update checks
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    checkForUpdates();
  }
});

// Check for updates by comparing cache versions
async function checkForUpdates() {
  try {
    // Fetch the current version from the server
    const response = await fetch('/version.json?' + Date.now());
    if (!response.ok) {
      throw new Error('Failed to fetch version');
    }
    
    const serverVersion = await response.json();
    const currentVersion = CACHE_NAME.split('-v')[1];
    
    if (serverVersion.version !== currentVersion) {
      console.log('[SW] Update available:', serverVersion.version);
      
      // Notify all clients about the update
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: serverVersion.version
        });
      });
    }
  } catch (error) {
    console.error('[SW] Failed to check for updates:', error);
  }
}

// Periodic update check every 2 minutes
setInterval(checkForUpdates, 2 * 60 * 1000);

// Special handling for iOS Safari
if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
  // iOS-specific cache handling
  self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'document') {
      event.respondWith(
        fetch(event.request)
          .catch(() => caches.match('/index.html'))
      );
    }
  });
}

console.log('[SW] Service worker loaded successfully');
