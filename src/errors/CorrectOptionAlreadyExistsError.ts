export class CorrectOptionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CorrectOptionAlreadyExistsError";
  }
}