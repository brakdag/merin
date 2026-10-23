'use strict';

// GitHub Pages serves the repository root on master.
// Copy only generated site files, leaving sources and repository files intact.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
for (const entry of ['index.html', 'css', 'js', 'assets']) {
    fs.cpSync(path.join(root, 'dist', entry), path.join(root, entry), { recursive: true });
}
// CNAME, sitemap.xml and robots.txt already live in the publishing root.
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log('GitHub Pages: raíz del repositorio actualizada (master /).');
