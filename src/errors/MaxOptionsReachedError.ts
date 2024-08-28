export class MaxOptionsReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MaxOptionsReachedError";
  }
}