export class MaxSessionsReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MaxSessionsReachedError";
  }
}
