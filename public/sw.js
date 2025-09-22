// Service Worker for PWA Auto-Update System
// Version: 2.0.0

const CACHE_VERSION = '1.0.14';
const CACHE_NAME = `markets-app-v${CACHE_VERSION}`;
const STATIC_CACHE_NAME = `markets-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `markets-dynamic-v${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `markets-runtime-v${CACHE_VERSION}`;

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
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
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
    
    // Cache successful responses by creating a new response
    if (networkResponse.ok) {
      try {
        const responseData = await networkResponse.arrayBuffer();
        const responseToCache = new Response(responseData, {
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          headers: networkResponse.headers
        });
        
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        // Silent fail for cache errors
      }
    }
    
    return networkResponse;
  } catch (error) {
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
      try {
        const responseData = await networkResponse.arrayBuffer();
        const responseToCache = new Response(responseData, {
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          headers: networkResponse.headers
        });
        
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        // Silent fail for cache errors
      }
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
  
  // If we have a cached response, return it immediately
  if (cachedResponse) {
    // Update cache in background without blocking
    // Don't try to clone responses in background - just fetch and cache directly
    fetch(request.url).then(async (networkResponse) => {
      if (networkResponse.ok) {
        try {
          // Create a new response from the same data to avoid cloning issues
          const responseData = await networkResponse.arrayBuffer();
          const newResponse = new Response(responseData, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers: networkResponse.headers
          });
          
          const cache = await caches.open(DYNAMIC_CACHE_NAME);
          await cache.put(request, newResponse);
        } catch (error) {
          // Silent fail for background cache updates
        }
      }
    }).catch(() => {
      // Ignore network errors for background updates
    });
    
    return cachedResponse;
  }
  
  // No cached response, fetch from network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Create a new response instead of cloning to avoid issues
      const responseData = await networkResponse.arrayBuffer();
      const responseToCache = new Response(responseData, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: networkResponse.headers
      });
      
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch:', request.url, error);
    throw error;
  }
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
    // Fetch the current version from the server with cache busting
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch version');
    }
    
    const serverVersion = await response.json();
    const currentVersion = CACHE_VERSION;
    
    
    if (serverVersion.version !== currentVersion) {
      // Force update by clearing all caches and reloading
      await clearAllCaches();
      
      // Notify all clients about the update
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: serverVersion.version,
          currentVersion: currentVersion
        });
      });
      
      // Auto-update by skipping waiting and claiming clients
      await self.skipWaiting();
      await self.clients.claim();
      
      // Force reload all clients
      clients.forEach(client => {
        client.postMessage({
          type: 'FORCE_RELOAD'
        });
      });
    }
  } catch (error) {
    console.error('[SW] Failed to check for updates:', error);
  }
}

// Clear all caches to force fresh download
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
    );
  } catch (error) {
    // Silent fail for cache clearing
  }
}

// Periodic update check every 30 seconds for immediate updates
setInterval(checkForUpdates, 30 * 1000);

// Check for updates immediately when service worker starts
checkForUpdates();

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

