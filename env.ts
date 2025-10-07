import { env as loadEnv } from 'custom-env';
import 'dotenv/config';
import { z } from 'zod';

const production = 'production';
const development = 'development';
const test = 'test';
const APP_STAGE = process.env.APP_STAGE || development;

export const isProd = APP_STAGE === production;
export const isDev = APP_STAGE === development;
export const isTest = APP_STAGE === test;

if (isDev) {
  loadEnv();
} else if (isTest) {
  loadEnv('test');
}

const envVariablesSchema = z.object({
  NODE_ENV: z.enum([production, test, development]).default(development),
  APP_STAGE: z.enum([production, test, development]).default(development),
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  JWT_SECRET: z.string().min(32, 'Must be 32 characters long'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
  ISSUER: z.string().nonempty('ISSUER cannot be empty'),
});

export type Env = z.infer<typeof envVariablesSchema>;

let env: Env | null = null;

export function getEnv(key: keyof Env) {
  if (!env) {
    console.error('Environment variable not set');
    process.exit(1);
  }
  return env[key];
}

const parseResult = envVariablesSchema.safeParse(process.env);
if (parseResult.error) {
  console.error('\n\n\nerror: environment variables issues');
  const { properties } = z.treeifyError(parseResult.error);
  console.error(JSON.stringify(properties, null, 2));
  console.error('\n\n\n');

  process.exit(1);
}
env = parseResult.data;
