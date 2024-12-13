import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './images';
const OUTPUT_DIR = './prepared-images';

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Read all image files
const imageFiles = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

// Copy and rename images if needed
imageFiles.forEach(filename => {
    const sourcePath = path.join(IMAGES_DIR, filename);
    const targetPath = path.join(OUTPUT_DIR, filename);
    
    // Copy file
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Prepared: ${filename}`);
});

console.log('\nInstructions:');
console.log('1. Go to https://carnaux.github.io/NFT-Marker-Creator/');
console.log('2. Upload each image from the prepared-images directory');
console.log('3. Download the .mind file for each image');
console.log('4. Place the .mind files in the markers directory');
console.log(`\nTotal images to process: ${imageFiles.length}`); 