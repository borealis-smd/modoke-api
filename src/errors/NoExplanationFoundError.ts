export class NoExplanationFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoExplanationFoundError";
  }
}