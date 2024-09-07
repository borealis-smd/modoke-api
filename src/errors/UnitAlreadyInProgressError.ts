export class UnitAlreadyInProgressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitAlreadyInProgressError";
  }
}
