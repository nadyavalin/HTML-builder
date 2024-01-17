const fs = require('fs');
// const path = require('path');

// const componentsFolder = 'components';
// const stylesFolder = 'styles';
// const assetsFolder = 'assets';
const projectDistFolder = './06-build-page/project-dist';

fs.mkdir(projectDistFolder, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating project-dist folder:', err);
  }
  console.log('Project-dist folder has been created!');
});
