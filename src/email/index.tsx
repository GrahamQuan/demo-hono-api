import {
  Resend,
  type CreateEmailResponseSuccess,
  type ErrorResponse,
} from 'resend';
import env from '@/lib/env';
import VerifyCodeEmail from './template/verify-code-email';

export const resend = new Resend(env.EMAIL_RESEND_API_KEY);

export const sendVerificationEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<{
  data: CreateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}> => {
  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email',
    react: <VerifyCodeEmail verificationCode={code} />,
  });

  if (error) {
    console.error(error);
  }

  return { data, error };
};
