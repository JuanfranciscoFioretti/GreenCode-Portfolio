const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images';

function findPngFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findPngFiles(filePath));
    } else if (file.endsWith('.png')) {
      results.push(filePath);
    }
  });
  return results;
}

async function convertToWebP() {
  const files = findPngFiles(inputDir);

  for (const file of files) {
    const relativePath = path.relative(inputDir, file);
    const outputPath = path.join(inputDir, relativePath.replace('.png', '.webp'));

    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${relativePath} to ${relativePath.replace('.png', '.webp')}`);
    } catch (error) {
      console.error(`Error converting ${relativePath}:`, error);
    }
  }
}

convertToWebP();