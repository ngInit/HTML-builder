const { buildCSS } = require('./helpers/merge_css.js');
const EventEmitter = require('node:events');
const path = require('node:path');
const emitter = new EventEmitter();

const targetDirectoryName = 'project-dist';
const cssDir = 'styles';

const rootCssPath = path.join(__dirname, cssDir);

const targetPath = path.join(__dirname, targetDirectoryName);
const targetCssPath = targetPath;
const targetCssName = 'style';

emitter.on('dir', () => {
  emitter.emit('css');
});
emitter.on('css', () => {
  buildCSS(rootCssPath, targetCssPath, targetCssName);
});

emitter.emit('dir');
