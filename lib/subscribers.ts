// lib/subscribers.ts
export type PushSubscriptionJSON = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

// TODO: Replace these with real DB reads/writes.
export async function listPushSubscribers(): Promise<PushSubscriptionJSON[]> {
  return [];
}
export async function savePushSubscriber(_sub: PushSubscriptionJSON): Promise<void> {}
export async function saveEmailSubscriber(_email: string): Promise<void> {}

