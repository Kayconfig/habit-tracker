export class TagNotFoundError extends Error {
  constructor(prop: string, value: string) {
    super(`Tag with ${prop} : ${value} not found`);
  }

  static create(prop: 'id' | 'name', value: string): TagNotFoundError {
    return new TagNotFoundError(prop, value);
  }
}
