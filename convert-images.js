const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { globby } = require('globby');

const IMG_DIR = 'static/img';
const MD_DIR = 'docs';

async function convertImages() {
  const imagePaths = await globby(`${IMG_DIR}/**/*.{png,jpg,jpeg}`);
  const markdownPaths = await globby(`${MD_DIR}/**/*.{md,mdx}`);

  const convertedWebps = new Set();

  for (const imgPath of imagePaths) {
    const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      await sharp(imgPath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      convertedWebps.add(path.basename(webpPath)); // store just the filename
      fs.unlinkSync(imgPath);
      console.log(`✅ Converted: ${imgPath} → ${webpPath}`);
    } catch (err) {
      console.error(`❌ Failed to convert ${imgPath}`, err);
    }
  }

  for (const mdPath of markdownPaths) {
    let content = fs.readFileSync(mdPath, 'utf8');
    let updated = content;

    updated = updated.replace(/\/img\/([\w-]+)\.(png|jpg|jpeg)/g, (match, name) => {
      const webpFile = `${name}.webp`;
      return convertedWebps.has(webpFile) ? `/img/${webpFile}` : match;
    });

    if (content !== updated) {
      fs.writeFileSync(mdPath, updated);
      console.log(`🔄 Updated image refs in: ${mdPath}`);
    }
  }

  console.log('✅ Done: Images converted, markdown updated (safely).');
}

convertImages();
