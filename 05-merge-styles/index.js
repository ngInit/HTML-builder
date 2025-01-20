const fileStream = require('node:fs');
const path = require('node:path');

const sourceDir = 'styles';
const targetDir = 'project-dist';
const targetName = 'bundle';

let mapOfCss = new Map();
const readOptions = {
  encoding: 'utf8',
};
const createFileOptions = {
  flags: 'w',
  encoding: 'utf8',
};
const writeOptions = {
  flags: 'a',
  encoding: 'utf8',
};

function buildCSS(sourceCss, targetCss) {
  const pathWithSources = path.join(__dirname, sourceCss);
  const pathForResult = path.join(__dirname, targetCss);
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
        const locationOfFile = path.join(sourcesPath, fileBase);
        mapOfCss.set(fileName, locationOfFile);
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
  makeFileStream.on('finish', () => {
    mergeCss(mapOfCss, outputFilePath);
  });
}

function mergeCss(mapOfCss, outputFilePath) {
  mapOfCss.forEach((filePath, key) => {
    const readFileStream = fileStream.createReadStream(filePath, readOptions);
    const writeFileStream = fileStream.createWriteStream(
      outputFilePath,
      writeOptions,
    );
    mapOfCss.delete(key);
    const endOfLine = mapOfCss.size ? '\n' : '';
    readFileStream.on('data', (data) => {
      writeFileStream.write(data + endOfLine);
    });
    writeFileStream.on('finish', () => {
      readFileStream.close();
    });
  });
  console.log('Done!');
}

buildCSS(sourceDir, targetDir);
