const path = require('node:path');

let targetDirectoryName = '';
let componentsDir = '';
let assetsDir = '';
let cssDir = '';
let baseHtml = '';
let targetCssName = '';
let targetHtml = '';

let rootDir = '';
let rootComponentsPath = '';
let rootAssetsPath = '';
let rootCssPath = '';
let rootHtmlPath = '';
let targetPath = '';
let targetAssetsPath = '';
let targetCssPath = '';

function setBuildConfig(config) {
  targetDirectoryName = config.targetDirectoryName;
  componentsDir = config.componentsDir;
  assetsDir = config.assetsDir;
  cssDir = config.cssDir;
  baseHtml = config.baseHtml;
  targetCssName = config.targetCssName;
  targetHtml = config.targetHtml;
  setPaths();
}

function setPaths() {
  rootDir = __dirname;
  rootComponentsPath = path.join(rootDir, componentsDir);
  rootAssetsPath = path.join(rootDir, assetsDir);
  rootCssPath = path.join(rootDir, cssDir);
  rootHtmlPath = path.join(rootDir, baseHtml);
  targetPath = path.join(rootDir, targetDirectoryName);
  targetAssetsPath = path.join(targetPath, assetsDir);
  targetCssPath = targetPath;
}

function getBuildConfig({ ...config }) {
  setBuildConfig(config);
  return {
    targetDirectoryName: targetDirectoryName,
    componentsDir: componentsDir,
    assetsDir: assetsDir,
    cssDir: cssDir,
    baseHtml: baseHtml,
    targetCssName: targetCssName,
    targetHtml: targetHtml,
    rootDir: rootDir,
    rootComponentsPath: rootComponentsPath,
    rootAssetsPath: rootAssetsPath,
    rootCssPath: rootCssPath,
    rootHtmlPath: rootHtmlPath,
    targetPath: targetPath,
    targetAssetsPath: targetAssetsPath,
    targetCssPath: targetCssPath,
  };
}

module.exports = {
  getBuildConfig,
};
