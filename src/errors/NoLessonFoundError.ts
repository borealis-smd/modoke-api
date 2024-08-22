export class NoLessonFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoLessonFoundError";
  }
}