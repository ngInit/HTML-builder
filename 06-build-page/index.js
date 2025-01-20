/**/
/* ====>   ОБРАТИ ВНИМАНИЕ !   <====
 *
 * For CROSS-CHECK you have to copy 4 more modules from my repo:
 * Для CROSS-CHECK надо скопировать ещё 4 модуля из моего репо:
 *   build_paths.js
 *   dir_to_dir.js
 *   merge_css.js
 *   merge_html.js
 * In them I reused the code from tasks 04 and 05 for convenience.
 * В них я переиспользовал код из тасков 04 и 05 для удобства.
 */

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
