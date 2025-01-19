const fileStream = require('node:fs');
const path = require('node:path');

const sourceDir = 'styles';
const targetDir = 'project-dist';
const targetName = 'bundle';

let mapOfCSS = new Map();
const createFileOptions = {
  flags: 'w',
  encoding: 'utf8',
};

function buildCSS(sourceCSS, targetCSS) {
  const pathWithSources = path.join(__dirname, sourceCSS);
  const pathForResult = path.join(__dirname, targetCSS);
  collectAllCSS(pathWithSources, pathForResult);
}

function collectAllCSS(sourcesPath, targetPath) {
  fileStream.readdir(sourcesPath, (error, files) => {
    if (error || !files.length) {
      throw error;
    }
    files.forEach((file) => {
      const fileExtension = path.parse(file).ext.slice(1);
      const fileName = path.parse(file).name;
      if (fileExtension === 'css') {
        const fileBase = path.parse(file).base;
        const locationOfFile = path.join(targetPath, fileBase);
        mapOfCSS.set(fileName, locationOfFile);
      }
    });
    createOutputFile(mapOfCss, targetPath);
  });
}

function createOutputFile(mapOfCss, targetPath) {
  const outputFilePath = path.join(targetPath, targetName + '.css');
  const makeFileStream = fileStream.createWriteStream(
    outputFilePath,
    createFileOptions,
  );
  makeFileStream.write('', (error) => {
    if (error) {
      console.log('Error:', error.message);
    } else {
      makeFileStream.close();
    }
  });
}

buildCSS(sourceDir, targetDir);
