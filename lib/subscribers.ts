// lib/subscribers.ts
// Replace these with real DB reads/writes later.

export type PushSubscriptionJSON = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export async function listPushSubscribers(): Promise<PushSubscriptionJSON[]> {
  // TODO: read from DB. Placeholder returns empty list.
  return [];
}

export async function savePushSubscriber(_sub: PushSubscriptionJSON): Promise<void> {
  // TODO: write to DB.
}

export async function saveEmailSubscriber(_email: string): Promise<void> {
  // TODO: write to DB / ESP.
}
