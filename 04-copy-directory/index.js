const fs = require('fs').promises;

async function copyDir() {
  try {
    const copiedFilesPath = './04-copy-directory/files-copy';
    await fs.mkdir(copiedFilesPath, { recursive: true });
    const originalFiles = await fs.readdir('./04-copy-directory/files');
    const copiedFiles = await fs.readdir(copiedFilesPath);

    await Promise.all(
      copiedFiles.map(async (item) => {
        await fs.unlink(`${copiedFilesPath}/${item}`);
      }),
    );

    await Promise.all(
      originalFiles.map(async (item) => {
        const sourcePath = `./04-copy-directory/files/${item}`;
        const destinationPath = `./04-copy-directory/files-copy/${item}`;
        await fs.copyFile(sourcePath, destinationPath);
      }),
    );

    console.log('Directory has been copied successfully.');
  } catch (error) {
    console.error('Error occurred while copying directory:', error);
  }
}

copyDir();
