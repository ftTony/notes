/**
 * 有序链表
 */
class SortedLinkedList extends LinkList {
  constructor(
    equalsFn = (a, b) => {
      return a == b
    },
    compareFn = (a, b) => {
      if (a === b) {
        return 0
      }
      return a < b ? -1 : 1
    }
  ) {
    super(equalsFn)
    this.equalsFn = equalsFn
    this.compareFn = compareFn
  }
  push(element) {
    if (this.isEmpty()) {
      super.push(element)
    } else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }
  insert(element, index = 0) {
    if (this.isEmpty()) {
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }
  getIndexNextSortedElement(element) {
    let current = this.head
    let i = 0
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return i
  }
}
