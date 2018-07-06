var doCache = false;

// Name our cache
var CACHE_NAME = 'my-pwa-cache-v1';
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline.html';
// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.open(currentCache.offline)
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

console.log("testing")
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        'puppy.jpg',
          'kitten.jpg',
          "owl.jpg",
          "raccoon.jpg",
          "donkey.jpg",
          "giraffe.jpg",
          "elephant.jpg",
          "shivam.jpg",
          offlineUrl
      ])
      console.log("cached")
    })
  );
});
// The first time the user starts up the PWA, 'install' is triggered.

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match(offlineUrl);
          })
    );
  }
  else{
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                        return response || fetch(event.request);
                    })
            );
      }
});

// let deferredPrompt;
    
// var but = document.createElement("BUTTON")
// // var t = document.createTextNode("Add to Home Screen")
// // but.appendChild(t)
// // document.body.appendChild(but)
// let btnAdd = but


// window.addEventListener('beforeinstallprompt', (e) => {
// // Prevent Chrome 67 and earlier from automatically showing the prompt
// console.log("the user has not installed our app")
// e.preventDefault();
// // Stash the event so it can be triggered later.
// deferredPrompt = e;
// btnAdd.style.display = 'block';
// });
// btnAdd.addEventListener('click', (e) => {
// // hide our user interface that shows our A2HS button
// btnAdd.style.display = 'none';
// // Show the prompt
// // deferredPrompt.prompt();
// beforeinstallpromptevent.prompt()
// // Wait for the user to respond to the prompt
// deferredPrompt.userChoice
// .then((choiceResult) => {
//   if (choiceResult.outcome === 'accepted') {
//     console.log('User accepted the A2HS prompt');
//   } else {
//     console.log('User dismissed the A2HS prompt');
//   }
//   deferredPrompt = null;
// });
// });
// window.addEventListener('appinstalled', (evt) => {
// app.logEvent('a2hs', 'installed');
// });
// if (window.matchMedia('(display-mode: standalone)').matches) {
// console.log('display-mode is standalone');
// }
// if (window.navigator.standalone === true) {
// console.log('display-mode is standalone');
// }