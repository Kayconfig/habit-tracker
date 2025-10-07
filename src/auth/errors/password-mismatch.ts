export class PasswordMismatchError extends Error {
  constructor() {
    super('password do not match');
  }

  static create(): PasswordMismatchError {
    return new PasswordMismatchError();
  }
}
