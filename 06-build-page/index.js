const { copyDir } = require('./helpers/dir_to_dir.js');
const { buildCSS } = require('./helpers/merge_css.js');
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

const buildConfig = {
  targetDirectoryName: 'project-dist',
  componentsDir: 'components',
  assetsDir: 'assets',
  cssDir: 'styles',
  baseHtml: 'template.html',
  targetCssName: 'style',
  targetHtml: 'index.html',
};

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
