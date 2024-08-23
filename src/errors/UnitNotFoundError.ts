export class UnitNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitNotFoundError";
  }
}