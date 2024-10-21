const cacheName = 'v.1.1'; 
const precacheResources = [
    "index.html",
    "manifest.json",
    "jokes.min.js",
    "main.js",
    "normalize.css",
    "style.css",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
    "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
];

self.addEventListener('install', event => {
    // console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheAllowlist = [cacheName];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for:', event.request.url);
    // dont try to match resource from certain domain
    // if (event.request.url.indexOf('rex.com') > 1) return;
    
    event.respondWith(caches.match(event.request) 
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});