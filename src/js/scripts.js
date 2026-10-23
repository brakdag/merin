'use strict';

// Progressive enhancement: content and links also work without JavaScript.
document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
const mobileMenu = window.matchMedia('(max-width: 800px)');

function closeMenu(restoreFocus = false) {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuToggle.focus();
}

menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) closeMenu();
});
document.addEventListener('focusin', event => {
    if (!event.target.closest('.nav')) closeMenu();
});
mobileMenu.addEventListener('change', () => closeMenu());

document.querySelector('#year').textContent = new Date().getFullYear();

// Assign exactly one video source, after the lightweight poster has painted.
// Reduced motion, data saving and slow connections default to the still image.
const video = document.querySelector('#background-video');
const videoToggle = document.querySelector('#video-toggle');
const videoLabel = videoToggle.querySelector('.video-label');
const videoSymbol = videoToggle.querySelector('.video-symbol');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
const saveData = () => Boolean(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType)));
let userPaused = false;
let manuallyStarted = false;
let inView = true;
let playPending = false;
let playbackFailed = false;
let videoReady = false;

function setVideoLabel(playing) {
    videoLabel.textContent = playing ? 'Pausar video' : 'Reproducir video';
    videoSymbol.textContent = playing ? 'Ⅱ' : '▶';
}

function canPlay() {
    return videoReady && !userPaused && !document.hidden && inView && !playbackFailed &&
        (manuallyStarted || (!reducedMotion.matches && !saveData()));
}

async function playVideo() {
    if (!canPlay() || playPending || !video.paused) return;
    playPending = true;
    if (!video.getAttribute('src')) {
        const smallScreen = window.matchMedia('(max-width: 800px)').matches;
        video.src = smallScreen || connection?.effectiveType === '3g' ? video.dataset.mobile : video.dataset.desktop;
        video.muted = true;
    }
    try {
        await video.play();
        if (!canPlay()) video.pause();
    } catch (error) {
        // Autoplay may be blocked by the browser. Keep the poster and allow a tap.
        if (error.name !== 'AbortError') userPaused = true;
        setVideoLabel(false);
    } finally {
        playPending = false;
    }
}

function syncPlayback() {
    if (canPlay()) void playVideo();
    else video.pause();
}

videoToggle.hidden = false;
videoToggle.addEventListener('click', () => {
    if (!video.paused || playPending) {
        userPaused = true;
        video.pause();
    } else {
        userPaused = false;
        manuallyStarted = true;
        videoReady = true;
        void playVideo();
    }
});
video.addEventListener('playing', () => {
    video.classList.add('is-playing');
    setVideoLabel(true);
});
video.addEventListener('pause', () => setVideoLabel(false));
video.addEventListener('error', () => {
    playbackFailed = true;
    video.classList.remove('is-playing');
    videoToggle.hidden = true;
});
document.addEventListener('visibilitychange', syncPlayback);
reducedMotion.addEventListener('change', () => {
    manuallyStarted = false;
    syncPlayback();
});
connection?.addEventListener('change', () => {
    manuallyStarted = false;
    syncPlayback();
});
if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        syncPlayback();
    }, { threshold: 0.05 }).observe(document.querySelector('.hero'));
}

// Let the poster render before a video request can compete for bandwidth.
// Two animation frames also leave a paint opportunity on cached navigations.
function prepareVideo() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
        const start = () => {
            videoReady = true;
            syncPlayback();
        };
        if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 });
        else window.setTimeout(start, 200);
    }));
}
if (document.readyState === 'complete') prepareVideo();
else window.addEventListener('load', prepareVideo, { once: true });

// Google Maps is only downloaded when a visitor asks to see it.
const mapButton = document.querySelector('#load-map');
mapButton.hidden = false;
mapButton.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = 'Ubicación de la Escuela Reynaldo Merín en Google Maps';
    frame.src = mapButton.dataset.src;
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    const status = document.querySelector('#map-status');
    status.textContent = 'Cargando el mapa. También podés usar el enlace Cómo llegar.';
    const placeholder = document.querySelector('.map-placeholder');
    placeholder.hidden = true;
    frame.addEventListener('load', () => { status.textContent = 'Mapa insertado. Si no se muestra, usá el enlace Cómo llegar.'; });
    document.querySelector('#map-panel').append(frame);
    frame.focus();
}, { once: true });
