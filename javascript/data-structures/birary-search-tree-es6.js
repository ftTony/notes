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
        if (this.root = null) {
            this.root = new Node(this.root, key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new Node(key)
        } else {
            this.insertNode(node.right, key)
        }
    }
    getRoot() {
        return this.root
    }
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {

    }
    inOrderTraverse(callback) {
        this.inOrderTraveseNode(this.root, callback)
    }
    inOrderTraveseNode(node, callback) {

    }
    preOrderTravese(callback) {
        this.preOrderTraveseNode(this.root, callback)
    }
    preOrderTraveseNode(node, callback) {

    }
    postOrderTravese(callback) {
        this.postOrderTraveseNode(this.root, callback)
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
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {

    }
}