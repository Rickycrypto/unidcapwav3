// app/api/broadcast/route.ts
import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { listPushSubscribers } from '../../../lib/subscribers';

export async function POST(req: Request) {
  const key = process.env.BROADCAST_KEY || '';
  const auth = req.headers.get('authorization') || '';

  if (!key || auth !== `Bearer ${key}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message = 'Hello!' } = await req.json().catch(() => ({}));

  // Ensure VAPID is configured (or this will throw at runtime)
  // webpush.setVapidDetails('mailto:you@example.com', process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);

  const subs = await listPushSubscribers();
  const results = await Promise.allSettled(
    subs.map((s) => webpush.sendNotification(s as any, JSON.stringify({ message })))
  );

  const sent = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.length - sent;

  return NextResponse.json({ ok: true, sent, failed });
}
