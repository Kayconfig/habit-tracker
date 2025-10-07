export class UserEmailExistError extends Error {
  constructor(email: string) {
    super(`user email ${email} already exists`);
  }

  static create(email: string): UserEmailExistError {
    return new UserEmailExistError(email);
  }
}
