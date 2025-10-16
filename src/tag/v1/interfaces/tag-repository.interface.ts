import type { Tag } from '../../../db/schema.ts';
import type { CreateTag } from '../../dto/create-tag.dto.ts';

export interface TagRepository {
  create(input: CreateTag): Promise<Tag>;
  findById(id: string): Promise<Tag | null>;
  delete(id: string): Promise<Tag | null>;
}

export interface TagRepositoryClient {
  create(input: CreateTag): Promise<Tag>;
  findById(id: string): Promise<Tag | null>;
  delete(id: string): Promise<Tag | null>;
}
