import crypto from 'crypto';

// Secret key stored on the server (In production, load via process.env.FLAG_SECRET)
const FLAG_SECRET = process.env.FLAG_SECRET || 'break_ai_super_secret_ctf_key_2026';

/**
 * Generates a dynamic, verifiable flag for a specific challenge and optional user identifier.
 * Example format: FLAG{ch-1_8a1f9d3b7e}
 */
export function generateFlag(challengeId: string, userId: string = 'default_user'): string {
  const hmac = crypto.createHmac('sha256', FLAG_SECRET);
  hmac.update(`${challengeId}:${userId}`);
  const signature = hmac.digest('hex').substring(0, 12);
  return `FLAG{${challengeId}_${signature}}`;
}

/**
 * Verifies whether a submitted flag matches the expected HMAC for a challenge.
 */
export function verifyFlag(challengeId: string, submittedFlag: string, userId: string = 'default_user'): boolean {
  if (!submittedFlag || !submittedFlag.startsWith('FLAG{') || !submittedFlag.endsWith('}')) {
    return false;
  }

  const expectedFlag = generateFlag(challengeId, userId);
  
  // Use timingSafeEqual to prevent timing attacks
  try {
    const expectedBuffer = Buffer.from(expectedFlag);
    const submittedBuffer = Buffer.from(submittedFlag.trim());

    if (expectedBuffer.length !== submittedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, submittedBuffer);
  } catch {
    return false;
  }
}