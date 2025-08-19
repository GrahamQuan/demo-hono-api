import env from '@/lib/env';
import { cache } from '@/cache';
import { TOTP } from 'totp-generator';

// Generate and store the verification code
export async function generateDigitCode(
  email: string,
  digits = 6
): Promise<{ code: string; expiresAt: number }> {
  const code = TOTP.generate(env.AUTH_TOTP_SECRET, { digits });
  const key = `verification:${email}`;

  // Store the verification code, expires in 5 minutes
  // await cache.set(key, code.otp, 'EX', 300);
  await cache.set({ key, value: code.otp, mode: 'EX', ttl: 300 });

  return { code: code.otp, expiresAt: code.expires };
}

// Verify the verification code submitted by the user
export async function verifyDigitCode(
  email: string,
  userSubmittedCode: string
): Promise<{ valid: boolean; message: string }> {
  const key = `verification:${email}`;
  const storedCode = await cache.get(key);

  if (!storedCode) {
    return {
      valid: false,
      message: 'Verification code has expired or does not exist',
    };
  }

  if (storedCode === userSubmittedCode) {
    // Delete the verification code after successful verification
    await cache.del(key);
    return { valid: true, message: 'Verification code is correct' };
  }

  return { valid: false, message: 'Verification code is incorrect' };
}
