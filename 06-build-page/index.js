const { copyDir } = require('./helpers/dir_to_dir.js');
const { buildCSS } = require('./helpers/merge_css.js');
const EventEmitter = require('node:events');
const fileStream = require('node:fs');
const path = require('node:path');

const targetDirectoryName = 'project-dist';
const componentsDir = 'components';
const assetsDir = 'assets';
const cssDir = 'styles';
const baseHtml = 'template.html';
const targetCssName = 'style';

let tempHtml = '';
const rootComponentsPath = path.join(__dirname, componentsDir);
const rootAssetsPath = path.join(__dirname, assetsDir);
const rootCssPath = path.join(__dirname, cssDir);
const rootHtmlPath = path.join(__dirname, baseHtml);

const targetPath = path.join(__dirname, targetDirectoryName);
const targetAssetsPath = path.join(targetPath, assetsDir);
const targetCssPath = targetPath;

let mapOfComponents = new Map();
const emitter = new EventEmitter();

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
    });
  });
}

function insertComponent(componentName, componentHtml) {
  const findInterpolation = new RegExp('{{' + componentName + '}}', 'g');
  tempHtml = tempHtml.replaceAll(findInterpolation, componentHtml);
}


emitter.on('dir', () => {
  copyDir(rootAssetsPath, targetAssetsPath);
  emitter.emit('css');
});
emitter.on('css', () => {
  buildCSS(rootCssPath, targetCssPath, targetCssName);
  emitter.emit('components');
});
emitter.on('components', () => {
  collectData(rootHtmlPath, rootComponentsPath);
});

emitter.emit('dir');
