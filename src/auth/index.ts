import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';
// import { tryCatch } from '../lib/promise-utils';
// import { generateDigitCode } from '@/generator/digit-code';
// import { sendVerificationEmail } from '@/email';
import { hashPassword, verifyPassword } from '@/generator/password';
import env from '@/lib/env';
import { captcha, emailOTP, oneTap } from 'better-auth/plugins';
import { v7 as uuidv7 } from 'uuid';

export const auth = betterAuth({
  baseURL: env.API_URL, // important
  secret: env.AUTH_BETTER_AUTH_SECRET,
  trustedOrigins: [
    env.WEBSITE_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  advanced: {
    database: {
      generateId: () => uuidv7(),
    },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 3600, // 1 hour
    password: {
      hash: async (password) => {
        const hashedPassword = await hashPassword(password);
        return hashedPassword;
      },
      verify: async ({ hash, password }) => {
        const isValid = await verifyPassword(hash, password);
        return isValid;
      },
    },
  },
  emailVerification: {
    requireEmailVerification: true,
    // sendVerificationEmail: async ({ user, url, token }) => {
    sendVerificationEmail: async ({ user }) => {
      const userEmail = user.email as string;
      // const [generateErr, generateData] = await tryCatch(
      //     generateDigitCode(userEmail)
      // );
      // if (generateErr) {
      //   throw generateErr;
      // }
      // const { code } = generateData;
      // const [sendErr, sendData] = await tryCatch(
      // const [sendErr] = await tryCatch(
      //   sendVerificationEmail({
      //     email: userEmail,
      //     code,
      //   })
      // );
      // if (sendErr) {
      //   throw sendErr;
      // }
    },
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.API_URL}/api/auth/callback/google`,
    },
  },
  plugins: [
    oneTap(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: env.AUTH_TURNSTILE_SECRET_KEY,
    }),
  ],
});

export type Auth = typeof auth;
