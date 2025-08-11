// app/api/broadcast/route.ts
import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { listPushSubscribers } from '@/lib/subscribers';

// Configure VAPID once (same public key as NEXT_PUBLIC_VAPID_PUBLIC_KEY)
webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  const key = process.env.BROADCAST_KEY || '';
  const auth = req.headers.get('authorization') || '';
  if (!key || auth !== `Bearer ${key}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message = 'Hello!' } = await req.json().catch(() => ({}));

  const subs = await listPushSubscribers();
  const results = await Promise.allSettled(
    subs.map((s) => webpush.sendNotification(s as any, JSON.stringify({ title: 'Broadcast', message })))
  );

  const sent = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.length - sent;

  return NextResponse.json({ ok: true, sent, failed });
}
