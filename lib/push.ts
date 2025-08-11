// lib/push.ts
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export async function enablePush(): Promise<void> {
  if (!('serviceWorker' in navigator)) throw new Error('Service worker not supported');
  if (!('PushManager' in window)) throw new Error('Push API not supported');

  // Registers /public/sw.js
  const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Notifications permission denied');

  const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapid) throw new Error('Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY');

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapid),
  });

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  });
  if (!res.ok) throw new Error('Failed to save subscription');
}
