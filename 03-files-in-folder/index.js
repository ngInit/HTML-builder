const fileStream = require('node:fs');
const path = require('node:path');

const currentPath = __dirname;
const targetDirectory = 'secret-folder';
const targetPath = path.join(currentPath, targetDirectory);

function checkFiles(filesPath) {
  fileStream.readdir(filesPath, (error, files) => {
    if (error || !files.length) {
      console.log('Error:', error.message);
    }
    files.forEach((file) => {
      const objectPath = path.join(targetPath, file);
    });
  });
}
checkFiles(targetPath);
