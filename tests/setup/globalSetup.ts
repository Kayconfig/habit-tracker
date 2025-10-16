import { sql } from 'drizzle-orm';
import { execSync } from 'node:child_process';
import { getDB } from '../../src/db/connnection.ts';
import {
  entries,
  habits,
  habitTags,
  tags,
  users,
} from '../../src/db/schema.ts';

const db = getDB();

export default async function setup() {
  console.log('💾 setting up the test db');
  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${tags} CASCADE`);

    console.log('🚀 pushing fresh data into db using drizzle-kit');

    execSync(
      `npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="postgresql"`,
      {
        stdio: 'inherit',
        cwd: process.cwd(),
      }
    );
    console.log('✅ Test DB created');
  } catch (e) {
    console.error('❌ fail to setup test db');
    console.error(e);
    throw e;
  }

  return async () => {
    try {
      await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${tags} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);

      process.exit(0);
    } catch (e) {
      console.error('❌ fail to clear db after test', e);
      throw e;
    }
  };
}
