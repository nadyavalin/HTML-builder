const fs = require('fs').promises;
const path = require('path');

// Создание папки project-dist
const projectDistFolderPath = './06-build-page/project-dist';
const templateFilePath = './06-build-page/template.html';
const stylesFolderPath = './06-build-page/styles';
const assetsFolderPath = './06-build-page/assets';
const newAssetsFolderPath = './06-build-page/project-dist/assets';

async function createProjectDistFolder() {
  try {
    await fs.mkdir(projectDistFolderPath, { recursive: true });
    console.log('project-dist folder has been created!');
  } catch (err) {
    console.error('Error while creating project-dist folder:', err);
  }
}

createProjectDistFolder();

// Создание index.html в папке project-dist
async function buildIndexFile() {
  try {
    let templateContent = await fs.readFile(templateFilePath, 'utf8');

    const templateTags = templateContent.match(/{{\w+}}/g);
    if (templateTags) {
      for (const tag of templateTags) {
        const componentName = tag.replace(/{{|}}/g, '');
        const componentPath = path.join(
          './06-build-page/components',
          componentName + '.html',
        );
        const componentContent = await fs.readFile(componentPath, 'utf8');
        templateContent = templateContent.replace(
          new RegExp(tag, 'g'),
          componentContent,
        );
      }

      const indexPath = path.join(projectDistFolderPath, 'index.html');
      await fs.writeFile(indexPath, templateContent, 'utf8');
      console.log('index.html has been created in project-dist folder!');
    }
  } catch (err) {
    console.error('Error while building index.html:', err);
  }
}

buildIndexFile();

// Создание файла style.css в папке project-dist
async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolderPath);
    const styleFiles = files.filter((file) => path.extname(file) === '.css');

    let bundleContent = '';
    for (const file of styleFiles) {
      const content = await fs.readFile(
        path.join(stylesFolderPath, file),
        'utf8',
      );
      bundleContent += content + '\n';
    }

    await fs.writeFile(
      path.join(projectDistFolderPath, 'style.css'),
      bundleContent,
      'utf8',
    );
    console.log('style.css has been created in project-dist folder!');
  } catch (err) {
    console.error('Error while merging styles:', err);
  }
}

mergeStyles();

// Копирование директории assetes в папке project-dist
async function copyDir() {
  try {
    await fs.mkdir(newAssetsFolderPath, { recursive: true });
    await recursiveCopy(assetsFolderPath, newAssetsFolderPath);
    console.log('assets folder has been copied in project-dist folder!');
  } catch (error) {
    console.error('Error while copying directory assets:', error);
  }
}

async function recursiveCopy(source, target) {
  const targetDirectory = path.resolve(target);
  await fs.mkdir(targetDirectory, { recursive: true });

  const files = await fs.readdir(source);
  for (const file of files) {
    const currentSource = path.join(source, file);
    const currentTarget = path.join(targetDirectory, file);
    const stats = await fs.stat(currentSource);

    if (stats.isDirectory()) {
      await recursiveCopy(currentSource, currentTarget);
    } else {
      await fs.copyFile(currentSource, currentTarget);
    }
  }
}

copyDir();
