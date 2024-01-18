const fs = require('fs');
const path = require('path');

// Создание папки project-dist
const projectDistFolderPath = './06-build-page/project-dist';

fs.mkdir(projectDistFolderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating project-dist folder:', err);
  }
  console.log('Project-dist folder has been created!');
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
