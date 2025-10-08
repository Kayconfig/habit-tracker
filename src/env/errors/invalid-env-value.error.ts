export class InvalidEnvValueError extends Error {
  constructor(envKey: string) {
    super(`Invalid environment value for ${envKey}`);
  }

  static create(envKey: string): InvalidEnvValueError {
    return new InvalidEnvValueError(envKey);
  }
}
