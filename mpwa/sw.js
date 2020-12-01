let CACHE_NAME = "infoSoccer-v1";
let urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/push.js",
    "/app.js",
    "/pages/home.html",
    "/pages/match.html",
    "/pages/team.html",
    "/pages/favteam.html",
    "/pages/favmatch.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/data-api.js",
    "/js/view.js",
    "/js/idb.js",
    // "/js/regis.js",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-152x152.png",
    "/img/icons/icon-192x192.png",
    "/img/icons/icon-384x384.png",
    "/img/icons/icon-512x512.png",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    let base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    let body;

    console.log(event);

    if (event.data) {
        body = event.data.text()
    } else {
        body = "Welcome to Info Soccer"
    }

    let options = {
        body: body,
        icon: '/img/icons/icon-512x512.png',
        vibrate: [500, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});