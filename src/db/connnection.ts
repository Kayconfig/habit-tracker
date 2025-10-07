import { remember } from '@epic-web/remember';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { getEnv, isProd } from '../../env.ts';
import * as schema from './schema.ts';

const createPool = () => {
  return new Pool({
    connectionString: getEnv('DATABASE_URL'),
  });
};

export const getDB = (() => {
  let client;

  return () => {
    if (isProd) {
      client = createPool();
    } else {
      client = remember('dbPool', () => createPool());
    }
    return drizzle({ client, schema });
  };
})();
