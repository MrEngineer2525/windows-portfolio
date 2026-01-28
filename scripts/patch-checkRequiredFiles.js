const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', 'react-dev-utils', 'checkRequiredFiles.js');
try {
  if (fs.existsSync(target)) {
    let src = fs.readFileSync(target, 'utf8');
    if (src.includes('fs.F_OK')) {
      src = src.replace(/fs\.F_OK/g, 'fs.constants.F_OK');
      fs.writeFileSync(target, src, 'utf8');
      console.log('Patched react-dev-utils/checkRequiredFiles.js: replaced fs.F_OK');
    } else {
      console.log('No fs.F_OK occurrences found in react-dev-utils/checkRequiredFiles.js');
    }
  } else {
    console.log('react-dev-utils/checkRequiredFiles.js not found; skipping patch.');
  }
} catch (err) {
  console.error('Failed to patch checkRequiredFiles.js:', err);
  process.exitCode = 1;
}
