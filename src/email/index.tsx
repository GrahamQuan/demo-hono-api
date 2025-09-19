import {
  Resend,
  type CreateEmailResponseSuccess,
  type ErrorResponse,
} from 'resend';
import env from '../lib/env';
import VerifyCodeEmail from './template/verify-code-email';
import { render, pretty } from '@react-email/render';

const emailInstance = new Resend(env.EMAIL_RESEND_API_KEY);

export const sendVerificationEmail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<{
  data: CreateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}> => {
  const htmlTemplate = await pretty(
    await render(<VerifyCodeEmail verificationCode={otp} />)
  );

  const { data, error } = await emailInstance.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email',
    html: htmlTemplate,
  });

  if (error) {
    console.error(error);
  }

  return { data, error };
};
