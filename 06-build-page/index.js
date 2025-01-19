const { copyDir } = require('./helpers/dir_to_dir.js');
const { buildCSS } = require('./helpers/merge_css.js');
const EventEmitter = require('node:events');
const path = require('node:path');
const emitter = new EventEmitter();

const targetDirectoryName = 'project-dist';
const assetsDir = 'assets';
const cssDir = 'styles';

const rootAssetsPath = path.join(__dirname, assetsDir);
const rootCssPath = path.join(__dirname, cssDir);

const targetPath = path.join(__dirname, targetDirectoryName);
const targetAssetsPath = path.join(targetPath, assetsDir);
const targetCssPath = targetPath;
const targetCssName = 'style';

emitter.on('dir', () => {
  copyDir(rootAssetsPath, targetAssetsPath);
  emitter.emit('css');
});
emitter.on('css', () => {
  buildCSS(rootCssPath, targetCssPath, targetCssName);
});

emitter.emit('dir');
