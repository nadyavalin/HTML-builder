const fs = require('fs');
const path = require('path');

// Создание папки project-dist
const projectDistFolderPath = './06-build-page/project-dist';

fs.mkdir(projectDistFolderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating project-dist folder:', err);
  }
  console.log('project-dist folder has been created!');
});

// Создание index.html в папке project-dist
const templatePath = './06-build-page/template.html';
fs.readFile(templatePath, 'utf8', (readFileErr, templateContent) => {
  if (readFileErr) {
    console.error('Error reading template file:', readFileErr);
    return;
  }
  const templateTags = templateContent.match(/{{\w+}}/g);
  if (templateTags) {
    templateTags.forEach((tag) => {
      const componentName = tag.replace(/{{|}}/g, '');
      const componentPath = path.join(
        './06-build-page/components',
        componentName + '.html',
      );
      fs.readFile(
        componentPath,
        'utf8',
        (readComponentErr, componentContent) => {
          if (readComponentErr) {
            console.error('Error reading component file:', readComponentErr);
            return;
          }
          templateContent = templateContent.replace(
            new RegExp(tag, 'g'),
            componentContent,
          );

          const indexPath = path.join(projectDistFolderPath, 'index.html');
          fs.writeFile(indexPath, templateContent, 'utf8', (writeFileErr) => {
            if (writeFileErr) {
              console.error('Error writing to index.html:', writeFileErr);
              return;
            }
          });
        },
      );
    });
  }
  console.log('index.html has been created in project-dist folder');
});

// Создание файла style.css
const stylesFolder = './06-build-page/styles';
const distFolder = './06-build-page/project-dist';
const mergedStyles = 'style.css';

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
    console.log('style.css file has been created successfully!');
  });
});

// Копирование директории assetes
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

async function copyFileOrDirectory(source, destination) {
  const sourceStats = await fs.promises.lstat(source);
  if (sourceStats.isDirectory()) {
    await fs.promises.mkdir(destination, { recursive: true });
    const items = await readdir(source);
    await Promise.all(
      items.map(async (item) => {
        const itemSource = path.join(source, item);
        const itemDestination = path.join(destination, item);
        await copyFileOrDirectory(itemSource, itemDestination);
      }),
    );
  } else {
    await copyFile(source, destination);
  }
}

async function copyDir() {
  const sourcePath = './06-build-page/assets';
  const destinationPath = './06-build-page/project-dist/assets';
  try {
    await mkdir(destinationPath, { recursive: true });
    await copyFileOrDirectory(sourcePath, destinationPath);
    console.log('Directory copied successfully.');
  } catch (error) {
    console.error('An error occurred while copying the directory:', error);
  }
}

copyDir();
