const fileStream = require('node:fs');
const path = require('node:path');
let mapOfComponents = new Map();

let tempHtml = '';
let targetPath = '';
let targetHtml = '';
let rootHtmlPath = '';
let rootComponentsPath = '';

function buildHtml(config) {
  targetPath = config.targetPath;
  targetHtml = config.targetHtml;
  rootHtmlPath = config.rootHtmlPath;
  rootComponentsPath = config.rootComponentsPath;
  collectData(rootHtmlPath, rootComponentsPath);
}

function collectData(rootHtmlPath, rootComponentsPath) {
  const originalHtmlTemplate = fileStream.createReadStream(
    rootHtmlPath,
    'utf8',
  );
  originalHtmlTemplate.on('data', (data) => {
    tempHtml = data.toString();
  });
  originalHtmlTemplate.on('end', () => {
    collectComponents(rootComponentsPath);
  });
}

function collectComponents(componentsPath) {
  fileStream.readdir(componentsPath, (error, components) => {
    if (error || !components.length) {
      console.log('Error:', error.message);
    }
    components.forEach((component) => {
      const componentPath = path.join(componentsPath, component);
      const componentName = path.parse(component).name;
      mapOfComponents.set(componentName, componentPath);
    });
    addComponentsToHtml(mapOfComponents);
  });
}

function addComponentsToHtml(mapOfComponents) {
  mapOfComponents.forEach((componentPath, componentName) => {
    let componentHtml = '';
    const readComponent = fileStream.createReadStream(componentPath, 'utf8');
    readComponent.on('data', (data) => {
      componentHtml = data.toString().trim();
      insertComponent(componentName, componentHtml);
    });
    readComponent.on('end', () => {
      addNewHtml();
    });
  });
}

function insertComponent(componentName, componentHtml) {
  const findInterpolation = new RegExp('{{' + componentName + '}}', 'g');
  tempHtml = tempHtml.replaceAll(findInterpolation, componentHtml);
}

function addNewHtml() {
  const targetHtmlPath = path.join(targetPath, targetHtml);
  const writeStream = fileStream.createWriteStream(targetHtmlPath);
  writeStream.write(tempHtml);
}

module.exports = {
  buildHtml,
};
