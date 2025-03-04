export class Node<T> {
  data: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export abstract class LinkedList<T> {
  protected head: Node<T> | null;
  protected tail: Node<T> | null;
  protected current: Node<T> | null;
  protected _size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this._size = 0;
  }

  // Add an item to the end of the list
  append(item: T): void {
    const newNode = new Node(item);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this._size++;
  }

  // Move to the next item if available
  next(): T | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.data;
    }
    return null;
  }

  // Move to the previous item if available
  previous(): T | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.data;
    }
    return null;
  }

  // Get the current item
  getCurrent(): T | null {
    return this.current ? this.current.data : null;
  }

  // Check if there's a next item
  hasNext(): boolean {
    return !!(this.current && this.current.next);
  }

  // Check if there's a previous item
  hasPrevious(): boolean {
    return !!(this.current && this.current.prev);
  }

  // Get all items as an array
  toArray(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current) {
      items.push(current.data);
      current = current.next;
    }

    return items;
  }

  // Get the total number of items
  get size(): number {
    return this._size;
  }

  // Get the current item index (0-based)
  getCurrentIndex(): number {
    let index = 0;
    let current = this.head;

    while (current && current !== this.current) {
      index++;
      current = current.next;
    }

    return current ? index : -1;
  }
} 