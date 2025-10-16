import type { Tag } from '../../db/schema.ts';
import type { CreateTag } from '../dto/create-tag.dto.ts';
import { TagNotFoundError } from '../errors/tag-not-found.error.ts';
import type { TagRepository } from './interfaces/tag-repository.interface.ts';
import tagRepository from './tag-repository.ts';

export interface TagService {
  create(input: CreateTag): Promise<Tag>;
  findById(id: string): Promise<Tag | null>;
  deleteById(id: string): Promise<Tag | null>;
}

function createTagService(tagRespository: TagRepository): TagService {
  return {
    create(input) {
      return tagRespository.create(input);
    },
    findById(id) {
      const tag = tagRespository.findById(id);
      if (!tag) {
        throw TagNotFoundError.create('id', id);
      }
      return tag;
    },
    deleteById(id) {
      const deletedTag = tagRespository.delete(id);
      if (!deletedTag) {
        throw TagNotFoundError.create('id', id);
      }
      return deletedTag;
    },
  };
}

export const tagService = createTagService(tagRepository);
export default tagService;
