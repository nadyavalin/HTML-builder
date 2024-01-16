const fs = require('fs').promises;

async function copyDir() {
  try {
    await fs.mkdir('./04-copy-directory/files-copy', { recursive: true });

    const dirContents = await fs.readdir('./04-copy-directory/files');

    await Promise.all(
      dirContents.map(async (item) => {
        const sourcePath = `./04-copy-directory/files/${item}`;
        const destinationPath = `./04-copy-directory/files-copy/${item}`;
        await fs.copyFile(sourcePath, destinationPath);
      }),
    );

    console.log('Directory copied successfully.');
  } catch (error) {
    console.error('Error occurred while copying directory:', error);
  }
}

copyDir();
