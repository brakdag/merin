'use strict';

// GitHub Pages serves docs/. Keep its generated files in sync with the preview.
// Copy without deleting older files, so existing asset URLs keep working.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
fs.cpSync(path.join(root, 'dist'), path.join(root, 'docs'), { recursive: true });
console.log('GitHub Pages: docs/ actualizado.');
