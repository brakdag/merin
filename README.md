# Escuela Técnica Reynaldo Merín

Sitio institucional de la Escuela N.º 4-124 de San Rafael, Mendoza.
Dominio: https://merin.edu.ar/ (GitHub Pages).

## Desarrollo

Requiere Node.js 22 o posterior y npm.

```sh
npm ci
npm start
```

`src/pug/index.pug` contiene la página, `src/scss/styles.scss` los estilos y
`src/js/scripts.js` el comportamiento. Las fotos y los videos están en `src/assets/`.
`npm start` genera `dist/` y abre una vista previa con recarga automática.

## Preparar GitHub Pages

```sh
npm run build:pages
```

Este comando compila en `dist/` y copia `index.html`, `css/`, `js/` y `assets/` a la
**raíz del repositorio**. `CNAME`, `sitemap.xml` y `robots.txt` ya están en esa raíz;
también genera `.nojekyll` para servir el sitio estático directamente.
No publica ni hace un commit. Para publicar, revisar los cambios y subirlos a
`master`, con GitHub Pages configurado en **master → / (root)**. El dominio sigue
siendo `merin.edu.ar`. No editar el HTML o CSS generado: la próxima compilación
lo reemplaza.

`src/` conserva las fuentes y `dist/` sirve para la vista previa. La carpeta `docs/`
queda como copia anterior y ya no se actualiza ni se usa como origen de publicación.
La compilación incluye los seis archivos multimedia que usa la página; los
originales siguen disponibles en `src/assets/`.

Para revisar exactamente la versión que se publica desde la raíz:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Abrir http://127.0.0.1:4174/.

## Carga y accesibilidad

- Fuentes del sistema, iconos SVG y componentes sin dependencias externas de interfaz.
- Imagen WebP de portada prioritaria; el video se inicia después de la carga y de
  una oportunidad de pintado. Se descarga una sola versión: móvil o escritorio.
- Sin reproducción automática cuando se solicita movimiento reducido, ahorro de
  datos o la conexión indica 2G. El botón permite iniciar el video voluntariamente.
- El video se pausa al salir de la portada o al ocultar la pestaña, y respeta una
  pausa solicitada por el visitante.
- Fotografías de las secciones con carga diferida. Google Maps se inserta solo al
  pulsar «Ver mapa interactivo»; también hay enlaces directos para llegar.
- Navegación con teclado, menú móvil, enlace para saltar al contenido y preguntas
  frecuentes nativas. El contenido y los enlaces funcionan sin JavaScript.

## Continuar el trabajo

El estado de la revisión y las verificaciones está en [CONTINUIDAD.md](CONTINUIDAD.md).
Este archivo permite retomar el proyecto aunque no esté disponible el chat anterior.
