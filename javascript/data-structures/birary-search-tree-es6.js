const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class Node {
    constructor(key) {
        this.key = key
        this.left = undefined
        this.right = undefined
    }
    toString() {
        return `${this.key}`
    }
}

class BinarySearchTree {
    contructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = undefined
    }
    insert(key) {

    }
    insertNode(node, key) {

    }
    getRoot() {
        return this.root
    }
    search(key) {

    }
    searchNode(node, key) {

    }
    inOrderTraverse(callback) {

    }
    inOrderTraveseNode(node, callback) {

    }
    preOrderTravese(callback) {

    }
    preOrderTraveseNode(node, callback) {

    }
    postOrderTravese(callback) {

    }
    postOrderTraveseNode(node, callback) {

    }
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {

    }
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {

    }
    remove(key) {

    }
    removeNode(node, key) {

    }
}