const path = require('node:path');

const sourceDir = 'styles';
const targetDir = 'project-dist';


function buildCSS(sourceCSS, targetCSS) {
  const pathWithSources = path.join(__dirname, sourceCSS);
  const pathForResult = path.join(__dirname, targetCSS);
}

buildCSS(sourceDir, targetDir);
