# Continuidad del sitio de la Escuela Reynaldo Merín

Actualizado: 23 de octubre de 2026.

## Pedido

Modernizar la web de la escuela técnica de San Rafael, Mendoza, manteniendo el
video de fondo y la información principal, con especial atención a la velocidad.
El sitio está alojado en GitHub Pages y usa el dominio merin.edu.ar.
El usuario confirmó que el Instagram de la escuela es **@escuelareynaldomerin**.
La publicación debe mantenerse en **master → / (root)**; el usuario no puede
cambiarla a `/docs`.

## Estado

- Se retomó el rediseño que ya estaba guardado en `src/`, sin un historial del chat
  anterior dentro del proyecto.
- Se comparó la información con la página publicada. Se conservan biblioteca,
  centro de estudiantes, teléfonos, dirección, Facebook y YouTube. Se actualizó
  Instagram al usuario indicado. Los textos se reorganizaron y simplificaron.
- Diseño adaptable con escudo, portada con video, accesos rápidos, secciones de
  escuela, biblioteca, estudiantes, contacto y preguntas frecuentes.
- El video usa una imagen inicial WebP y una única versión según pantalla y
  conexión. Inicia después de cargar la página y dar oportunidad a pintarla.
  Se respeta movimiento reducido y ahorro de datos; se pausa fuera de pantalla y
  al ocultar la pestaña. Hay control manual de reproducción.
- Fuentes del sistema, iconos SVG, imágenes WebP y mapa que carga al pulsar su botón.
  La página ya no descarga Bootstrap, Font Awesome, Google Fonts ni SB Forms.
- Se corrigieron un `docType` inválido que provocaba modo quirks, cortes a 320 px,
  contraste, nombre accesible del enlace de inicio y texto alternativo de la foto
  del taller. El diseño sin JavaScript usa `noscript` para evitar saltos de carga.
- `npm run build:pages` genera `dist/` y copia `index.html`, `css/`, `js/` y `assets/`
  a la raíz del repositorio para publicar desde **master → / (root)**. `CNAME`,
  sitemap y robots.txt permanecen en la raíz. `.nojekyll` permite servir los archivos
  estáticos directamente. Las fuentes se conservan en `src/` y `docs/` queda como
  copia anterior, sin actualizarse ni usarse para publicar.
- La adaptación a publicación desde la raíz está preparada localmente; el agente
  no hizo commit, push ni cambios en la configuración remota de GitHub.

## Verificaciones realizadas

- Compilación `npm run build:pages` y revisión de sintaxis JavaScript.
- Doctype válido, IDs únicos, anclas existentes, archivos locales presentes y
  equivalencia de los 12 archivos generados de `dist/` con sus copias en la raíz.
  Se verificaron también `.nojekyll`, el dominio en `CNAME` y los enlaces de Instagram.
- Navegador a 320, 375, 390, 768, 1024 y 1440 px; revisión visual de móvil y escritorio.
- Menú móvil, Escape con devolución de foco, mapa bajo demanda, reproducción manual,
  elección de video móvil/escritorio, pausa fuera de pantalla y persistencia de la
  pausa voluntaria. Sin errores ni advertencias en la consola en la prueba final.
- Movimiento reducido y ahorro de datos: no se solicita el video automáticamente.
  Con ahorro de datos tampoco hay solicitudes iniciales a terceros.
- Página cargada en un iframe de prueba con scripts deshabilitados por sandbox:
  menú visible, enlaces disponibles, sin desbordamiento a 320 px y mapa alternativo.
- Lighthouse local: 100 en accesibilidad, buenas prácticas y SEO en móvil y escritorio.
  La auditoría de escritorio final no reportó fallos. Esto no es una puntuación de
  rendimiento ni una medición de visitantes reales.
- Traza de rendimiento local con pantalla de 390 px, Slow 4G y CPU ralentizada 4x:
  LCP de 2950 ms y CLS de 0,00. El servidor de prueba no reproduce exactamente
  la compresión y caché de GitHub Pages.
- CSS: 241.590 bytes antes y aproximadamente 15.544 después (94 % menos).
  Video original: 14.169.380 bytes; escritorio: 6.013.388; móvil: 2.627.131.

Los informes temporales se guardaron en `/tmp/merin-audit-mobile-final/`,
`/tmp/merin-audit-desktop-final/` y `/tmp/merin-performance-mobile.json.gz`.
El informe móvil antecede a la corrección del salto de diseño; la traza posterior
confirma CLS 0,00. Esos archivos temporales pueden desaparecer al cerrar la sesión.

## Retomar

1. Leer este archivo y `README.md`; revisar `git status` para preservar cambios.
2. Editar `src/pug/index.pug`, `src/scss/styles.scss` o `src/js/scripts.js`.
3. Ejecutar `npm run build:pages` después de editar.
4. Revisar la vista previa antes de subir los archivos a GitHub.

En esta sesión se dejó un servidor local en http://127.0.0.1:4173/ que sirve `dist/`.
Si ya no está activo, se puede iniciar la vista de desarrollo con `npm start` o,
después de compilar, con `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`.
