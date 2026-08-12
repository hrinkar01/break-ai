import { NextResponse } from 'next/server';
import { verifyFlag } from '@/lib/flags';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { challengeId, flag } = body;

    if (!challengeId || !flag) {
      return NextResponse.json({ detail: 'Challenge ID and flag are required.' }, { status: 400 });
    }

    const isValid = verifyFlag(challengeId, flag);

    if (isValid) {
      return NextResponse.json({
        status: 'success',
        message: '🎉 Verified! Flag signature matches server secret.',
      });
    }

    return NextResponse.json(
      { detail: '❌ Invalid flag! Check string formatting or exploit accuracy.' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ detail: 'Invalid request format.' }, { status: 400 });
  }
}