export class SectionAlreadyInProgressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SectionAlreadyInProgressError";
  }
}
