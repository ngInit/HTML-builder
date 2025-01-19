const { buildCSS } = require('./helpers/merge_css.js');
const path = require('node:path');
const targetDirectoryName = 'project-dist';
const cssDir = 'styles';
const rootCssPath = path.join(__dirname, cssDir);
const targetPath = path.join(__dirname, targetDirectoryName);
const targetCssPath = targetPath;
const targetCssName = 'style';
  buildCSS(rootCssPath, targetCssPath, targetCssName);
