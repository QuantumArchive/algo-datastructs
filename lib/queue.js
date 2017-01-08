module.exports = function() {

    class QNode {
        constructor(value) {
            this.value = value;
            this.next = this.prev = null;
        }
    };

    return class Queue {
        constructor() {
            this.head = this.tail = null;
        }
        enqueue(value) {
            let nodeToInsert = new QNode(value);
            if(!this.head) {
                this.head = nodeToInsert;
                this.tail = nodeToInsert;
            } else {
                this.tail.next = nodeToInsert;
                nodeToInsert.prev = this.tail;
                this.tail = nodeToInsert;
            };
        }
        dequeue() {
            if(!this.head) {
                console.log('nothing in the queue');
                return null;
            } else {
                let nodeToReturn = this.head;
                this.head = this.head.next;
                nodeToReturn.next = null;
                if (!this.head) { //one node only so head and tail are the same node
                    this.tail = null;
                    return nodeToReturn;
                } else {
                    this.head.prev = null;
                    return nodeToReturn;
                };
            };
        }
        checkTail() {
            if (this.tail) return this.tail;
            else {
                console.log('nothing in the queue');
                return null;
            };
        }
        checkHead() {
            if (this.head) return this.head;
            else {
                console.log('nothing in the queue');
                return null;
            };
        }
        checkEmpty() {
            this.checkHead();
        }
    };
};