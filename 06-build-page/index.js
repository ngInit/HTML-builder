const { copyDir } = require('./helpers/dir_to_dir.js');
const { buildCSS } = require('./helpers/merge_css.js');
const EventEmitter = require('node:events');

const targetDirectoryName = 'project-dist';
const componentsDir = 'components';
const assetsDir = 'assets';
const cssDir = 'styles';
const baseHtml = 'template.html';
const targetCssName = 'style';

const rootAssetsPath = path.join(__dirname, assetsDir);
const rootCssPath = path.join(__dirname, cssDir);

const targetAssetsPath = path.join(targetPath, assetsDir);
const targetCssPath = targetPath;

const emitter = new EventEmitter();



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
