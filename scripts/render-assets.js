'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function renderAssets() {
    const root = path.resolve(__dirname, '..');
    // Publish only assets used by this page; keep the original media in src/.
    const assets = [
        'escuela-desktop.mp4',
        'escuela-mobile.mp4',
        'img/escudo.webp',
        'img/escuela-poster.webp',
        'img/biblioteca.webp',
        'img/comunidad.webp',
    ];
    for (const asset of assets) {
        const destination = path.join(root, 'dist/assets', asset);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(path.join(root, 'src/assets', asset), destination);
    }
    for (const file of ['CNAME', 'sitemap.xml', 'robots.txt']) {
        fs.copyFileSync(path.join(root, file), path.join(root, 'dist', file));
    }
};
