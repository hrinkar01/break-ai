import { NextResponse } from 'next/server';
import { LAB_CHALLENGES } from '@/lib/challenges';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const challengeId = body.challengeId;
    const submittedFlag = (body.flag || '').trim();

    const challenge = LAB_CHALLENGES.find((c) => c.id === challengeId) || LAB_CHALLENGES[0];

    if (submittedFlag === challenge.flag) {
      return NextResponse.json({
        status: 'success',
        message: '🎉 Correct flag! Challenge completed.',
      });
    }

    return NextResponse.json(
      { detail: '❌ Invalid flag! Keep hunting.' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ detail: 'Invalid payload' }, { status: 400 });
  }
}