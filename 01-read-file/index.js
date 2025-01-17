const fileStream = require('node:fs');
const path = require('node:path');
const txtLocation = __dirname;

function readTxtFiles(targetPath) {
  fileStream.readdir(targetPath, (error, files) => {
    if (error || !files.length) {
      throw error;
    }
    files.forEach((file) => {
      const fileExtension = path.parse(file).ext.slice(1);
      if (fileExtension === 'txt') {
        const fileBase = path.parse(file).base;
        const locationOfFile = path.join(targetPath, fileBase);
        console.log(locationOfFile);
      }
    });
  });
}

readTxtFiles(txtLocation);
