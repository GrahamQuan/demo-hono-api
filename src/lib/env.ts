import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

expand(config({ path: '.dev.vars' }));

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  // NODE_ENV: z.enum(['development', 'production']),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message = `${String(issue.path[0])}: ${issue.message}\n`;
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export type ENV = z.infer<typeof EnvSchema>;
export default EnvSchema.parse(process.env);
