import BinarySearchTree from './birary-search-tree-es6'

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

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}

class AVITree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    getNodeHeight(node) {
        if (node === null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    /**
     * Left left case: rotate right
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     * @param node Node<T>
     */
    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
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
     * @param node Node<T>
     */
    rotationRR(node) {

    }
    /**
     * Left right case: rotate left then right
     * @param node Node<T>
     */
    rotationLR(node) {

    }
    /**
     * Right left case: rotate right then left
     * @param node Node<T>
     */
    rotationRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }
    getBalanceFactor(node) {

    }
    insert(key) {

    }
    insertNode(node, key) {

    }
    removeNode(node, key) {

    }
}