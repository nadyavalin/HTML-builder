const fs = require('fs');
const path = require('path');

const stylesFolder = './05-merge-styles/styles';
const distFolder = './05-merge-styles/project-dist';
const mergedStyles = 'bundle.css';

fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    console.error('Error reading styles folder:', err);
    return;
  }

  const styleFiles = files.filter((file) => path.extname(file) === '.css');

  let bundleContent = '';
  styleFiles.forEach((file) => {
    const content = fs.readFileSync(path.join(stylesFolder, file), 'utf8');
    bundleContent += content + '\n';
  });

  fs.writeFile(path.join(distFolder, mergedStyles), bundleContent, (err) => {
    if (err) {
      console.error('Error writing bundle file:', err);
      return;
    }
    console.log('Bundle file created successfully!');
  });
});
