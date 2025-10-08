export class EnvNotSetError extends Error {
  constructor() {
    super('Environment variables not set');
  }
  static create() {
    return new EnvNotSetError();
  }
}
