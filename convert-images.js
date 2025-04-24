// convert-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const globby = require('globby').globby;


const IMG_DIR = 'static/img';
const MD_DIR = 'docs';

async function convertImages() {
  const imagePaths = await globby(`${IMG_DIR}/**/*.{png,jpg,jpeg}`);
  const markdownPaths = await globby(`${MD_DIR}/**/*.{md,mdx}`);

  for (const imgPath of imagePaths) {
    const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      await sharp(imgPath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log(`✅ Converted: ${imgPath} → ${webpPath}`);

      // Delete original
      fs.unlinkSync(imgPath);
      console.log(`🗑 Deleted original: ${imgPath}`);
    } catch (err) {
      console.error(`❌ Failed to convert ${imgPath}`, err);
    }
  }

  // Rewrite markdown references
  for (const mdPath of markdownPaths) {
    let content = fs.readFileSync(mdPath, 'utf8');
    const updated = content.replace(/\.(png|jpg|jpeg)/g, '.webp');

    if (content !== updated) {
      fs.writeFileSync(mdPath, updated);
      console.log(`🔄 Updated image refs in: ${mdPath}`);
    }
  }

  console.log('✅ All image conversions and markdown updates complete!');
}

convertImages();
