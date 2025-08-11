// public/sw.js
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Broadcast';
  const body = data.message || 'Hello!';
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icon-192.png', // optional; add an icon to /public if you want
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
