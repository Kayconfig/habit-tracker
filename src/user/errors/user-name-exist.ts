export class UsernameExistError extends Error {
  constructor(username: string) {
    super(`username: ${username} already exists`);
  }

  static create(username: string): UsernameExistError {
    return new UsernameExistError(username);
  }
}
