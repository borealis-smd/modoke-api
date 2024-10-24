export class LevelNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LevelNotFoundError";
  }
}
