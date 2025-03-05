import { Section } from "@prisma/client";
import { LinkedList } from "./LinkedList";

export class SectionLinkedList extends LinkedList<Section> {
  findByLevel(levelId: number): Section[] {
    return this.toArray().filter(section => section.level_id === levelId);
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
} 