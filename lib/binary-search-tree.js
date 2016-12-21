const queue = require('./queue')();

module.exports = function() {

    class BSTNode {
        constructor(value) {
            this.value = value;
            this.parent = this.left = this.right = null;
        }
    };

    return class BinarySearchTree {
        constructor() {
            this.root = null;
        }
    };
};