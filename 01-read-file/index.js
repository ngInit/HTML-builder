const process = require('node:process');
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
        readFile(locationOfFile);
      }
    });
  });
}

function readFile(locationOfFile) {
  let result = '';
  const readFileStream = fileStream.createReadStream(locationOfFile, 'utf8');
  readFileStream.on('data', (data) => {
    result += data;
  });
  readFileStream.on('end', () => {
    process.stdout.write('\n' + result + '\n');
    readFileStream.close();
  });
  readFileStream.on('error', (error) => {
    console.log('Error', error.message);
  });
}

readTxtFiles(txtLocation);
