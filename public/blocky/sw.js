// mindX: RoboCode's upstream worker precached ~9 MB on the first visit. This one caches
// nothing and removes caches an earlier version left; the browser HTTP cache serves repeat visits.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(caches.keys()
  .then(keys => Promise.all(keys.filter(key => key.startsWith('robocode-')).map(key => caches.delete(key))))
  .then(() => self.clients.claim())));
