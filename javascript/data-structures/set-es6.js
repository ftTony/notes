/**
 * es6 set
 */
class Set {
  constructor() {
    this.items = {}
  }
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }
  values() {
    return Object.values(this.items)
  }
  union(otherSet) {}
  intersection(otherSet) {}
  difference(otherSet) {}
  isSubsetOf(otherSet) {}
  isEmpty() {}
  size() {}
  clear() {}
  toString() {}
}
