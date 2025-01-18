const process = require('node:process');
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
      checkIsFile(objectPath);
    });
  });
}

function checkIsFile(objectPath) {
  fileStream.stat(objectPath, (error, stats) => {
    if (error) {
      console.log('Error:', error.message);
    }
    if (!stats.isDirectory()) {
      showFileInfo(objectPath, stats);
    }
  });
}

function showFileInfo(file, stats) {
  const result = [];
  const divider = ' - ';
  const measurement = 'kB';
  const fileInfo = path.parse(file);
  const fileName = fileInfo.name;
  const fileExt = fileInfo.ext.slice(1);
  const fileSize = stats.size / 1000;
  result.push(fileName, fileExt, fileSize);
  process.stdout.write(result.join(divider) + measurement + '\n');
}

checkFiles(targetPath);
