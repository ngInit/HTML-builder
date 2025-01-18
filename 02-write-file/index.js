const process = require('node:process');
const { stdin, stdout } = process;
const fileStream = require('node:fs');
const path = require('node:path');

const locationOfFile = __dirname;
const fileName = 'text';

const writeOptions = {
  flags: 'a',
  encoding: 'utf8',
};

function writeToFile(fileLocation, fileName = 'new_file') {
  const fullPath = path.join(fileLocation, fileName + '.txt');
  const makeFileStream = fileStream.createWriteStream(fullPath, writeOptions);
  makeFileStream.write('', (error) => {
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('You always can press Ctrl + C or type exit for finish');
      console.log('Now, start input your text and press Enter: ');
      makeFileStream.close();
    }
  });
  makeFileStream.on('finish', () => {
    stdin.on('data', (data = '') => {
      if (data.toString().trim().toLowerCase() === 'exit') {
        process.exit();
      } else {
        console.log(fullPath, data);
      }
    });
  });
  return null;
}

writeToFile(locationOfFile, fileName);
