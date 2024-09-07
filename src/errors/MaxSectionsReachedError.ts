export class MaxSectionsReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MaxSectionsReachedError";
  }
}
