#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Building PWA with auto-update system...');

// Update version first
const { execSync } = require('child_process');
try {
  execSync('node scripts/update-version.js', { stdio: 'inherit' });
  console.log('✓ Version updated');
} catch (error) {
  console.error('✗ Failed to update version:', error.message);
  process.exit(1);
}

// Copy service worker to public directory
const sourceSwPath = path.resolve('src/sw.js');
const destSwPath = path.resolve('public/sw.js');

try {
  if (fs.existsSync(sourceSwPath)) {
    fs.copyFileSync(sourceSwPath, destSwPath);
    console.log('✓ Service worker copied to public directory');
  } else {
    console.error('✗ Service worker not found at:', sourceSwPath);
    process.exit(1);
  }
} catch (error) {
  console.error('✗ Failed to copy service worker:', error.message);
  process.exit(1);
}

// Copy manifest to public directory
const sourceManifestPath = path.resolve('src/manifest.json');
const destManifestPath = path.resolve('public/manifest.json');

try {
  if (fs.existsSync(sourceManifestPath)) {
    fs.copyFileSync(sourceManifestPath, destManifestPath);
    console.log('✓ Manifest copied to public directory');
  } else {
    console.error('✗ Manifest not found at:', sourceManifestPath);
    process.exit(1);
  }
} catch (error) {
  console.error('✗ Failed to copy manifest:', error.message);
  process.exit(1);
}

// Copy version.json to public directory
const sourceVersionPath = path.resolve('src/version.json');
const destVersionPath = path.resolve('public/version.json');

try {
  if (fs.existsSync(sourceVersionPath)) {
    fs.copyFileSync(sourceVersionPath, destVersionPath);
    console.log('✓ Version file copied to public directory');
  } else {
    console.error('✗ Version file not found at:', sourceVersionPath);
    process.exit(1);
  }
} catch (error) {
  console.error('✗ Failed to copy version file:', error.message);
  process.exit(1);
}

console.log('✓ PWA build completed successfully');
