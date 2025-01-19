const fileStream = require('node:fs');
const path = require('node:path');

const originalDirectory = 'files';
const newDirectory = 'files-copy';

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
}

makeCopyOfDir(originalDirectory, newDirectory);
