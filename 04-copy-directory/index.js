const fileStream = require('node:fs');
const path = require('node:path');

const originalDirectory = 'files';
const newDirectory = 'files-copy';

const writeOptions = {
  flags: 'w',
};

function makeCopyOfDir(copyFrom, copyTo) {
  const dirForCopy = path.join(__dirname, copyFrom);
  const newDirPath = path.join(__dirname, copyTo);
  createDirectory(dirForCopy, newDirPath);
}

function createDirectory(copyFrom, copyTo) {
  fileStream.mkdir(copyTo, (error) => {
    const rootName = path.dirname(copyTo);
    const dirName = path.basename(copyTo);
    if (error) {
      console.log(`Directory ${dirName} exists in ${rootName}`);
    } else {
      console.log(`Directory ${dirName} created in ${rootName}`);
    }
  });
  collectFiles(copyFrom, copyTo);
}

function collectFiles(collectFrom, newDirPath) {
  fileStream.readdir(collectFrom, (error, files) => {
    if (error || !files.length) {
      throw error;
    }
    files.forEach((file) => {
      const fileBase = path.parse(file).base;
      const originalFileLocation = path.join(collectFrom, fileBase);
      const targetFileLocation = path.join(newDirPath, fileBase);
      copyFile(originalFileLocation, targetFileLocation);
    });
  });
}

function copyFile(origFilePath, newFilePath) {
  const readStream = fileStream.createReadStream(origFilePath);
  const writeStream = fileStream.createWriteStream(newFilePath, writeOptions);
  readStream.on('data', (data) => {
    writeStream.write(data);
    writeStream.close();
  });
  writeStream.on('finish', () => {
    readStream.close();
  });
}


makeCopyOfDir(originalDirectory, newDirectory);
