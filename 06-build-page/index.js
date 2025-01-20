const { copyDir } = require('./dir_to_dir.js');
const { buildCss } = require('./merge_css.js');
const { buildHtml } = require('./merge_html.js');
const { getBuildConfig } = require('./build_paths.js');
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
  buildCss(config.rootCssPath, config.targetCssPath, config.targetCssName);
  emitter.emit('components', config);
});

emitter.on('components', (config) => {
  buildHtml(config);
});

emitter.emit('start', getBuildConfig(buildConfig));
