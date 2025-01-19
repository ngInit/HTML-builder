const fileStream = require('node:fs');
const path = require('node:path');

const originalDirectory = 'files';
const newDirectory = 'files-copy';

function makeCopyOfDir(copyFrom, copyTo) {
  const dirForCopy = path.join(__dirname, copyFrom);
  const newDirPath = path.join(__dirname, copyTo);
}

makeCopyOfDir(originalDirectory, newDirectory);
