export class ExplanationAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExplanationAlreadyExistsError";
  }
}
