// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { saveEmailSubscriber, savePushSubscriber } from '../../../lib/subscribers';

// Accept either an email OR a Web Push subscription object
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);

  // Email subscribe
  if (data?.email) {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    await saveEmailSubscriber(data.email);
    return NextResponse.json({ ok: true, type: 'email' });
  }

  // Web Push subscribe
  if (data?.subscription?.endpoint && data?.subscription?.keys?.p256dh && data?.subscription?.keys?.auth) {
    await savePushSubscriber(data.subscription);
    return NextResponse.json({ ok: true, type: 'push' });
  }

  return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

