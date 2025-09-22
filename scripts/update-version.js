#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get version from command line argument or auto-increment
const newVersion = process.argv[2] || getNextVersion();

console.log(`Updating version to: ${newVersion}`);

// Files to update
const filesToUpdate = [
  {
    path: 'src/version.json',
    updateFunction: (content) => {
      const versionData = JSON.parse(content);
      versionData.version = newVersion;
      versionData.buildTime = new Date().toISOString();
      versionData.timestamp = Date.now();
      return JSON.stringify(versionData, null, 2);
    }
  },
  {
    path: 'src/manifest.json',
    updateFunction: (content) => {
      const manifest = JSON.parse(content);
      manifest.version = newVersion;
      return JSON.stringify(manifest, null, 2);
    }
  },
  {
    path: 'src/sw.js',
    updateFunction: (content) => {
      return content.replace(
        /const CACHE_VERSION = '[^']*';/,
        `const CACHE_VERSION = '${newVersion}';`
      );
    }
  },
  {
    path: 'package.json',
    updateFunction: (content) => {
      const packageJson = JSON.parse(content);
      packageJson.version = newVersion;
      return JSON.stringify(packageJson, null, 2);
    }
  }
];

// Update each file
filesToUpdate.forEach(file => {
  const filePath = path.resolve(file.path);
  
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const updatedContent = file.updateFunction(content);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✓ Updated ${file.path}`);
    } catch (error) {
      console.error(`✗ Failed to update ${file.path}:`, error.message);
    }
  } else {
    console.warn(`⚠ File not found: ${file.path}`);
  }
});

console.log(`Version update completed: ${newVersion}`);

// Helper function to get next version
function getNextVersion() {
  try {
    const versionPath = path.resolve('src/version.json');
    if (fs.existsSync(versionPath)) {
      const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
      const currentVersion = versionData.version;
      
      // Simple version increment (e.g., 1.0.0 -> 1.0.1)
      const versionParts = currentVersion.split('.');
      const patch = parseInt(versionParts[2]) + 1;
      versionParts[2] = patch.toString();
      
      return versionParts.join('.');
    }
  } catch (error) {
    console.warn('Could not auto-increment version, using default');
  }
  
  return '1.0.0';
}
