/**
 * 循环链表
 */
CircularLinkedList extends LinkedList {
    constructor(equalsFn = ((a, b) => a === b)) {
        super(equalsFn);
    }
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.getElementAt(this.size() - 1);
            current.next = node;
        }
        node.next = this.head;
        this.count++;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                    current.next = this.head;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {

                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}