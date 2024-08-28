export class MissingCorrectOptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingCorrectOptionError";
  }
}