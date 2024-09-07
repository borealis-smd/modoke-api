export class LessonAlreadyInProgressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LessonAlreadyInProgressError";
  }
}
