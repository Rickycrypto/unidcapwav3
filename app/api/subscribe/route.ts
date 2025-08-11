// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

// POST /api/subscribe
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);

  // Basic email validation
  if (!data?.email || !/\S+@\S+\.\S+/.test(data.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email } = data;

  // TODO: save `email` to your database or service
  // await saveSubscriber(email);

  return NextResponse.json({ ok: true });
}

// GET /api/subscribe
export async function GET() {
  // TODO: fetch subscribers if needed
  return NextResponse.json({ ok: true });
}
