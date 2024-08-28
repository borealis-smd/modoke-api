export class MascotNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MascotNotFoundError";
  }
}
