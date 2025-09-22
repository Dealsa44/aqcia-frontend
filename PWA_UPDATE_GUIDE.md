# PWA Auto-Update System

This project includes a comprehensive PWA (Progressive Web App) auto-update system that automatically detects changes and updates the downloaded app on mobile devices without requiring users to delete and reinstall the app.

## Features

- ✅ **Automatic Update Detection**: Checks for updates every 30 seconds
- ✅ **Versioned Caching**: Uses versioned cache names to ensure fresh content
- ✅ **Network-First Strategy**: HTML/JS/CSS files use network-first caching
- ✅ **Cache-First Strategy**: Images and fonts use cache-first for performance
- ✅ **iOS Safari Support**: Special handling for iOS Safari PWA behavior
- ✅ **Auto-Cleanup**: Automatically removes old caches
- ✅ **Immediate Updates**: Updates are applied immediately after deployment
- ✅ **Cross-Platform**: Works on Android, iOS, and all mobile browsers

## How It Works

### 1. Service Worker (`src/sw.js`)
- Monitors for updates every 30 seconds
- Uses versioned cache names (e.g., `markets-app-v2.0.0`)
- Implements different caching strategies for different file types
- Automatically clears old caches when new version is detected
- Forces immediate updates by clearing caches and reloading

### 2. Service Worker Manager (`src/app/core/services/service-worker-manager.service.ts`)
- Manages service worker registration and lifecycle
- Handles update detection and notifications
- Provides different behavior for development vs production
- Manages periodic update checks

### 3. PWA Update Service (`src/app/core/services/pwa-update.service.ts`)
- Provides a clean API for update management
- Handles keyboard shortcuts (Ctrl+U)
- Manages update notifications
- Auto-applies updates in production

### 4. Version Management (`scripts/update-version.js`)
- Auto-increments version numbers
- Updates all relevant files (package.json, manifest.json, sw.js, version.json)
- Can be run manually or as part of build process

## Usage

### Building with PWA Updates

```bash
# Build with automatic version update
npm run build:pwa

# Build for Azure with automatic version update
npm run build:pwa:azure

# Just update version without building
npm run update-version
```

### Manual Version Update

```bash
# Update to specific version
node scripts/update-version.js 2.1.0

# Auto-increment version
node scripts/update-version.js
```

### Development

The system automatically detects updates in development mode and will:
- Check for updates every 30 seconds
- Show console logs when updates are available
- Auto-apply updates in production mode

## File Structure

```
src/
├── sw.js                           # Service worker with update logic
├── manifest.json                   # PWA manifest with update settings
├── version.json                    # Version information
├── app/
│   └── core/
│       └── services/
│           ├── service-worker-manager.service.ts
│           └── pwa-update.service.ts
scripts/
├── update-version.js              # Version update script
└── build-pwa.js                   # PWA build script
```

## Configuration

### Service Worker Settings

The service worker can be configured by modifying `src/sw.js`:

```javascript
const CACHE_VERSION = '2.0.0';  // Update this for new versions
const CHECK_INTERVAL = 30 * 1000;  // Check every 30 seconds
```

### Update Behavior

- **Development**: Updates are detected but require manual application
- **Production**: Updates are automatically applied immediately
- **Mobile**: Works seamlessly on all mobile devices and browsers

## Deployment Workflow

1. **Make Changes**: Modify your code as usual
2. **Push to GitHub**: Push changes to your repository
3. **Azure Deployment**: Azure automatically deploys the changes
4. **Auto-Update**: PWA automatically detects and applies the update within 30 seconds
5. **No User Action Required**: Users don't need to delete/reinstall the app

## Testing Updates

1. Make a small change to your app
2. Run `npm run build:pwa` to build with version update
3. Deploy to your server
4. Open the PWA on a mobile device
5. Wait up to 30 seconds - the app should automatically update

## Troubleshooting

### Updates Not Working
- Check browser console for service worker errors
- Ensure `version.json` is accessible at `/version.json`
- Verify service worker is registered correctly
- Check that cache version is being updated

### Manual Update Check
- Press `Ctrl+U` (or `Cmd+U` on Mac) to manually check for updates
- Check browser developer tools > Application > Service Workers

### Cache Issues
- Clear browser cache and reload
- Check that old caches are being deleted
- Verify version numbers are incrementing correctly

## Browser Support

- ✅ Chrome (Android/Desktop)
- ✅ Firefox (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Edge (Android/Desktop)
- ✅ Samsung Internet
- ✅ All PWA-compatible browsers

## Performance

- **Update Check**: Every 30 seconds (configurable)
- **Cache Size**: Automatically managed, old caches deleted
- **Network Usage**: Minimal - only checks version file
- **Battery Impact**: Negligible on mobile devices
