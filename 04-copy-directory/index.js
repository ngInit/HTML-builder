const fileStream = require('node:fs');
const path = require('node:path');

const originalDirectory = 'files';
const newDirectory = 'files-copy';

const writeOptions = {
  flags: 'w',
};

function copyDir(copyFrom, copyTo) {
  const dirForCopy = path.join(__dirname, copyFrom);
  const newDirPath = path.join(__dirname, copyTo);
  createDirectory(dirForCopy, newDirPath);
}

function createDirectory(copyFrom, copyTo) {
  fileStream.rm(copyTo, { recursive: true }, (error) => {
    const rootName = path.dirname(copyTo);
    const dirName = path.basename(copyTo);
    if (!error) {
      console.log(`Directory ${dirName} updated in ${rootName}`);
    } else {
      console.log(`Directory ${dirName} created in ${rootName}`);
    }
    fileStream.mkdir(copyTo, { recursive: true }, () => {
      collectFiles(copyFrom, copyTo);
    });
  });
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
      checkIsFile(originalFileLocation, targetFileLocation);
    });
  });
}

function checkIsFile(originalFileLocation, targetFileLocation) {
  fileStream.stat(originalFileLocation, (error, stats) => {
    if (error) {
      console.log('Error:', error.message);
    }
    if (!stats.isDirectory()) {
      copyFile(originalFileLocation, targetFileLocation);
    } else {
      createDirectory(originalFileLocation, targetFileLocation);
    }
  });
}

function copyFile(origFilePath, newFilePath) {
  const readStream = fileStream.createReadStream(origFilePath);
  const writeStream = fileStream.createWriteStream(newFilePath, writeOptions);
  readStream.on('data', (data) => {
    writeStream.write(data);
  });
  writeStream.on('finish', () => {
    readStream.close();
  });
  readStream.on('close', () => {
    showInfo(origFilePath, newFilePath);
  });
}

function showInfo(origFilePath, newFilePath) {
  let origPath = path.relative(newFilePath, origFilePath);
  let targetPath = path.relative(origFilePath, newFilePath);
  origPath = origPath.replaceAll(`..${path.sep}`, '');
  targetPath = targetPath.replaceAll(`..${path.sep}`, '');
  console.log(`Copying from ${origPath}  to  ${targetPath} done!`);
}

copyDir(originalDirectory, newDirectory);
