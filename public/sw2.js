importScripts('cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('SquadUp').then(function(cache) {
     return cache.addAll([
       '/',
       '404.html',
        'puppy.jpg',
        'kitten.jpg',
        'owl.jpg',
        'raccoon.jpg',
        'donkey.jpg',
        'giraffe.jpg',
        'elephant.jpg'
     ]);
     console.log("cached")
   })
 );
});

self.addEventListener('fetch', function(event) {

    console.log(event.request.url);
    
    event.respondWith(
    
    caches.match(event.request).then(function(response) {
    
    return response || fetch(event.request);
    
    })
    
    );
    
    });
    
    