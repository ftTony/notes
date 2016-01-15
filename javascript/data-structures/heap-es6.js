const Compare = {
    LESS_THAN: -1,
    bigger_THAN: 1,
    EQUALS: 0
}

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a)
}

function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
}

class MinHeap {
    constructor(compareFn = defaultCompare) {

    }
    getLeftIndex(index) {

    }
    getRightIndex(index) {

    }
    getParentIndex(index) {

    }
    size() {

    }
    isEmpty() {

    }
    clear() {
        this.heap = []
    }
    findMinimum() {

    }
    insert(value) {

    }
    siftDown(index) {

    }
    siftUp(index) {

    }
    extract() {

    }
    heapify(array) {

    }
    getAsArray() {
        return this.heap
    }
}

class Max extends MinHeap {
    constructor(compareFn = defaultCompare) {

    }
}