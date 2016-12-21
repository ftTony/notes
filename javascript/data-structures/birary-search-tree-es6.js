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
        if (node == null) {
            return false
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        }
        return true
    }
    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraveseNode(this.root, callback)
    }
    inOrderTraveseNode(node, callback) {
        if (node != null) {
            this.inOrderTraveseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraveseNode(node.right, callback)
        }
    }
    // 前序遍历
    preOrderTravese(callback) {
        this.preOrderTraveseNode(this.root, callback)
    }
    preOrderTraveseNode(node, callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraveseNode(node.left, callback)
            this.preOrderTraveseNode(node.right, callback)
        }
    }
    postOrderTravese(callback) {
        this.postOrderTraveseNode(this.root, callback)
    }
    postOrderTraveseNode(node, callback) {
        if (node != null) {
            this.postOrderTraveseNode(node.left, callback);
            this.postOrderTraveseNode(node.right, callback);
            callback(node.key)
        }
    }
    // 寻找最小值
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = ndoe
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current
    }
    // 寻找最大值
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
    // 移除元素
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        if (node === null) {
            return undefined
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        }

        if (node.left == null && node.right == null) {
            node = undefined
            return node
        }

        if (node.left == null) {
            node = node.right
            return node
        } else if (node.right == null) {
            node = node.left
            return node
        }

        const aux = this.minNode(node.right)
        node.key = aux.key
        node.right = this.removeNode(node.right, aux.key)
        return node
    }
}