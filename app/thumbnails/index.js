import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const thumbWidths = [350, 512, 1024];

export const generateThumbs = async (inputFile, destDir) => {
  console.log('Generating thumbnails for file:', inputFile);
  const promises = thumbWidths.map(async thumbWidth => {
    const suffix = `_${thumbWidth}`;
    const extension = path.extname(inputFile);
    const basename = path.basename(inputFile, extension);
    const finalFilename = basename + suffix + extension;
    const outputFile = path.join(destDir, finalFilename);
    return generateThumb(inputFile, outputFile, thumbWidth);
  });
  return Promise.all(promises);
};

const generateThumb = async (inputFile, outputFile, width) => {
  console.log('Generating thumbnail for', inputFile, 'with width', width);
  await sharp(inputFile)
    .resize(width, null, { fit: 'inside' })
    .toFile(outputFile);
  return `${outputFile} ${width}w`;
};

export const removeThumbs = async srcSet => {
  srcSet.forEach(src => {
    const filepath = src.split(' ', 1)[0];
    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, err => {
        if (err) {
          console.log(
            `An error ocurred deleting thumbnail ${filepath}: ${err.message}`
          );
          console.log(err);
          return;
        }
        console.log('Thumbnail succesfully deleted');
      });
    } else {
      console.log(`This thumbnail, ${filepath}, doesn't exist, cannot delete`);
    }
  });
};
