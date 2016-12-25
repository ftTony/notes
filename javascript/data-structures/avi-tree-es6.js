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
        const tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }
    /**
     * Left right case: rotate left then right
     * @param node Node<T>
     */
    rotationLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
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
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }

        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationRR(node);
            } else {
                return this.rotationLR(node);
            }
        }
        return node;
    }
    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (node == null) {
            return node
        }

        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.getBalanceFactor(node.left) === BalanceFactor.BALANCED || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node)
            }
            if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.getBalanceFactor(node.right) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node)
            }
            if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right)
            }
        }
        return node;
    }
}