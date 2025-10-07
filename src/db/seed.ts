import { getDB } from './connnection.ts';
import { entries, habits, habitTags, tags, users } from './schema.ts';

const seed = async () => {
  const db = getDB();
  console.log('🌱 starting database seed...');
  try {
    console.log('clearing existing data...');
    await db.delete(entries);
    await db.delete(habitTags);
    await db.delete(habits);
    await db.delete(tags);
    await db.delete(users);

    console.log('creating demo data...');
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@habit-tracker.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
      })
      .returning();

    console.log('creating tags...');
    const [healthTag] = await db
      .insert(tags)
      .values({ name: 'Health', color: '#fofofo' })
      .returning();

    console.log('creating habits...');
    const [exerciseHabit] = await db
      .insert(habits)
      .values({
        userId: demoUser.id,
        name: 'Exercise',
        description: 'Daily workout',
        frequency: 'daily',
        targetCount: 1,
      })
      .returning();

    console.log('creating habit tags');
    await db.insert(habitTags).values({
      habitId: exerciseHabit.id,
      tagId: healthTag.id,
    });

    console.log('Adding completion entries...');

    const today = new Date();
    today.setHours(12, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      await db.insert(entries).values({
        habitId: exerciseHabit.id,
        completionDate: date,
      });
    }

    console.log('✅ DB seeded successfully');
    console.log('\n\n---------- user credentials --------------------');
    console.log(`email: ${demoUser.email}`);
    console.log(`username: ${demoUser.username}`);
    console.log(`password: ${demoUser.password}`);
    console.log('------------------------------------------------\n\n');
  } catch (e) {
    console.error('Unable to seed database', e);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('running seeding logic');
  console.log(process.env);
  seed()
    .then(() => process.exit(0))
    .catch((e) => process.exit(1));
}

export default seed;
