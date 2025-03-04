import { Lesson } from "@prisma/client";
import { LinkedList } from "./LinkedList";

export class LessonLinkedList extends LinkedList<Lesson> {
  findBySequence(sequence: number): Lesson | null {
    return this.toArray().find(lesson => lesson.lesson_sequence === sequence) || null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
} 