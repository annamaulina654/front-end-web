// eslint-disable-next-line no-undef
const sharp = require('sharp');
// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const path = require('path');

// eslint-disable-next-line no-undef
const target = path.resolve(__dirname, 'src/public/images/heros');
// eslint-disable-next-line no-undef
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach((image) => {
    const imageName = path.parse(image).name;
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`),
      );

    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`),
      );

    sharp(`${target}/${image}`)
      .resize(800)
      .toFormat('webp')
      .toFile(
        // eslint-disable-next-line no-undef
        path.resolve(__dirname, `${destination}/${imageName}-large.webp`)
      );

    sharp(`${target}/${image}`)
      .resize(480)
      .toFormat('webp')
      .toFile(
        // eslint-disable-next-line no-undef
        path.resolve(__dirname, `${destination}/${imageName}-small.webp`)
      );
  });