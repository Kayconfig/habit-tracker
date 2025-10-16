import type {
  TagRepository,
  TagRepositoryClient,
} from './interfaces/tag-repository.interface.ts';
import tagDrizleClient from './tag-repository-client-drizzle.ts';

function createTagRepository(dbClient: TagRepositoryClient): TagRepository {
  return {
    create(input) {
      return dbClient.create(input);
    },
    findById(id) {
      return dbClient.findById(id);
    },
    delete(id) {
      return dbClient.delete(id);
    },
  };
}

export const tagRepository: TagRepository =
  createTagRepository(tagDrizleClient);

export default tagRepository;
