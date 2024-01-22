const fs = require('fs').promises;
const path = require('path');

const stylesFolder = './05-merge-styles/styles';
const distFolder = './05-merge-styles/project-dist';
const mergedStyles = 'bundle.css';

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolder);
    const styleFiles = files.filter((file) => path.extname(file) === '.css');
    const fileContents = await Promise.all(
      styleFiles.map((file) =>
        fs.readFile(path.join(stylesFolder, file), 'utf8'),
      ),
    );
    const bundleContent = fileContents.join('\n');
    await fs.writeFile(path.join(distFolder, mergedStyles), bundleContent);

    console.log('Bundle file has been created successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

mergeStyles();
