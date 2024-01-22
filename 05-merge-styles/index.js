const fs = require('fs').promises;
const path = require('path');

const stylesFolder = './05-merge-styles/styles';
const distFolder = './05-merge-styles/project-dist';
const mergedStyles = 'bundle.css';

fs.readdir(stylesFolder)
  .then((files) => {
    const styleFiles = files.filter((file) => path.extname(file) === '.css');
    let fileReadPromises = styleFiles.map((file) => {
      return fs.readFile(path.join(stylesFolder, file), 'utf8');
    });
    return Promise.all(fileReadPromises);
  })
  .then((fileContents) => {
    let bundleContent = fileContents.join('\n');
    return fs.writeFile(path.join(distFolder, mergedStyles), bundleContent);
  })
  .then(() => {
    console.log('Bundle file has been created successfully!');
  })
  .catch((err) => {
    console.error('Error:', err);
  });
