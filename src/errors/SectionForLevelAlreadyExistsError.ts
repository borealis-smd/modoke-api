export class SectionForLevelAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SectionForLevelAlreadyExistsError";
  }
}
