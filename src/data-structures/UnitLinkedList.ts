import { Unit } from "@prisma/client";
import { LinkedList } from "./LinkedList";

export class UnitLinkedList extends LinkedList<Unit> {
  isEmpty(): boolean {
    return this.size === 0;
  }

  findBySection(sectionId: number): Unit[] {
    return this.toArray().filter(unit => unit.section_id === sectionId);
  }
} 