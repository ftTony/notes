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

class RedBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Colors.RED
    }
    isRed() {
        return this.color === Colors.RED
    }
    flipColor() {
        if (this.color === Colors.RED) {
            this.color = Colors.BLACK
        } else {
            this.color = Colors.RED
        }
    }
}

const Colors = {
    RED: 0,
    BLACK: 1
}

import BinarySearchTree from './birary-search-tree-es6'

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
    }
    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node
        }
        tmp.parent = node.parent
        if (!node.parent) {
            this.root = tmp
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node
        node.parent = tmp
    }
    /**
     * Right right case: rotate left
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     * 
     */
    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node
        }
        tmp.parent = node.parent
        if (!node.parent) {
            this.root = tmp
        } else {

        }
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key)
            node.right.parent = node
            return node.right
        } else {
            return this.insertNode(node.right, key)
        }
    }
    fixTreeProperties(node) {

    }
    getRoot() {

    }
}