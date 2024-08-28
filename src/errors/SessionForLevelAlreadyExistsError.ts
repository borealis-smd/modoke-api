export class SessionForLevelAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionForLevelAlreadyExistsError";
  }
}
