const { copyDir } = require('./helpers/dir_to_dir.js');
const { buildCSS } = require('./helpers/merge_css.js');
const { buildHtml } = require('./helpers/merge_html.js');
const { getBuildConfig } = require('./helpers/build_paths.js');
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

emitter.on('start', (config) => {
  copyDir(config.rootAssetsPath, config.targetAssetsPath);
  emitter.emit('css', config);
});

emitter.on('css', (config) => {
  buildCSS(config.rootCssPath, config.targetCssPath, config.targetCssName);
  emitter.emit('components', config);
});

emitter.on('components', (config) => {
  buildHtml(config);
});

emitter.emit('start', getBuildConfig(buildConfig));
