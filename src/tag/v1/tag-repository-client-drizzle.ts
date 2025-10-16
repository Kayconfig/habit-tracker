import { eq } from 'drizzle-orm';
import { getDB } from '../../db/connnection.ts';
import { tags, type Tag } from '../../db/schema.ts';
import type { CreateTag } from '../dto/create-tag.dto.ts';
import type { TagRepositoryClient } from './interfaces/tag-repository.interface.ts';

const db = getDB();

async function create(input: CreateTag): Promise<Tag> {
  const [tag] = await db
    .insert(tags)
    .values({
      name: input.name,
      color: input.color,
    })
    .returning();

  return tag;
}

async function findById(id: string): Promise<Tag | null> {
  const tag = await db.query.tags.findFirst({ where: eq(tags.id, id) });
  return tag ?? null;
}

async function deleteById(id: string): Promise<Tag | null> {
  const deletedTag = await db.delete(tags).where(eq(tags.id, id));
  return deletedTag ?? null;
}

export const tagDrizleClient: TagRepositoryClient = {
  create,
  findById,
  delete: deleteById,
};

export default tagDrizleClient;
