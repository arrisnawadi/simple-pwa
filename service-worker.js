const CACHE_NAME = 'ekosistem-v1'
const urlsToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/pages/home.html',
    '/pages/darat.html',
    '/pages/air.html',
    '/pages/buatan.html',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/register-sw.js',
    '/js/nav.js',
    '/css/style.css',
    '/img/bioma-gurun.jpg',
    '/img/bioma-hutan-gugur.jpg',
    '/img/bioma-sabana.jpg',
    '/img/bioma-taiga.png',
    '/img/bioma-tundra.jpg',
    '/img/padang-rumput.jpg',
    '/img/Hutan-Hujan-Tropis.jpg',
    '/img/kebun-binatang.jpg',
    '/img/kolam-ikan.jpg',
    '/img/perkebunan.jpg',
    '/img/sawah.jpg',
    '/img/laut.jpg',
    '/img/sungai.jpg',
    '/img/eko-air.jpg',
    '/img/eko-buatan.jpg',
    '/img/eko-darat.jpg',
    '/img/icon-512.png',
    '/img/icon-192.png',
    '/manifest.json'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    console.log('ServiceWorker: Gunakan aset dari cache: ', response.url)
                    return response
                }

                console.log(
                    'ServiceWorker: Memuat aset dari server: ',
                    event.request.url
                )
                return fetch(event.request)
            })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})