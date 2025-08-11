// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const Body = z.object({ email: z.string().email() });

// POST /api/subscribe
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const parsed = Body.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email } = parsed.data;

  // TODO: persist to your DB / provider
  // await saveSubscriber(email);

  return NextResponse.json({ ok: true });
}

// GET /api/subscribe (optional)
export async function GET() {
  // const subs = await listSubscribers();
  return NextResponse.json({ ok: true /*, subs*/ });
}

// If you hit caching issues when reading from a DB, uncomment:
// export const dynamic = 'force-dynamic';
