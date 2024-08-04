export class MissingFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingFieldError";
  }
}
