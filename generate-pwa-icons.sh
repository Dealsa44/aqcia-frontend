#!/bin/bash

# PWA Icon Generator Script
# This script helps generate PWA icons from a base SVG

echo "PWA Icon Generator for Markets Startup"
echo "======================================"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "  Windows: Download from https://imagemagick.org/script/download.php#windows"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p src/assets/icons

# Base SVG file
BASE_SVG="src/assets/icons/icon-base.svg"

if [ ! -f "$BASE_SVG" ]; then
    echo "Base SVG file not found: $BASE_SVG"
    echo "Please create the base SVG icon first."
    exit 1
fi

# Icon sizes for PWA
SIZES=(72 96 128 144 152 192 384 512)

echo "Generating PWA icons..."

for size in "${SIZES[@]}"; do
    echo "  Generating ${size}x${size} icon..."
    convert "$BASE_SVG" -resize "${size}x${size}" "src/assets/icons/icon-${size}x${size}.png"
done

# Generate maskable icons (with padding for adaptive icons)
echo "Generating maskable icons..."
for size in 192 512; do
    echo "  Generating maskable ${size}x${size} icon..."
    # Create maskable icon with safe area padding
    convert "$BASE_SVG" -resize "$((size * 80 / 100))x$((size * 80 / 100))" \
            -background transparent \
            -gravity center \
            -extent "${size}x${size}" \
            "src/assets/icons/icon-maskable-${size}x${size}.png"
done

echo "✅ PWA icons generated successfully!"
echo ""
echo "Generated files:"
ls -la src/assets/icons/icon-*.png

echo ""
echo "Next steps:"
echo "1. Review the generated icons"
echo "2. Replace with your actual app icons if needed"
echo "3. Test the PWA installation"
