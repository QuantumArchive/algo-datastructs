'use strict';

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
        find(key) {
            // ideally what I want is an iterative solution
            // that returns a node if it's not present so then 
            // we can go ahead and insert a new node there for
            // the insertion of a new node
            let q = this.root;
            let searching = true;
            while (searching) {
                if (q.value === key) {
                    searching = false;
                    return q;
                } else if (q.value > key) {
                    if (q.left) q = q.left;
                    else {
                        searching = false;
                        return q;
                    };
                } else {
                    if (q.right) q = q.right;
                    else {
                        searching = false;
                        return q;
                    };
                };
            };
        }
        next(node) {
            if(node.right) return leftDescendent(node.right);
            else return rightAncestor(node);
        }
    };
};