const fileStream = require('node:fs');
const path = require('node:path');

const sourceDir = 'styles';
const targetDir = 'project-dist';

let mapOfCSS = new Map();

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
  });
}

buildCSS(sourceDir, targetDir);
