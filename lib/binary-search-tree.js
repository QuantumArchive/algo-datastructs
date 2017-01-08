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
        // node in the tree with next largest key
            if (node.right) return leftDescendant(node.right);
            else return rightAncestor(node);
        }
        // see if I can convert these to iterative methods
        leftDescendant(node) {
            if (!node.left) return node;
            else return leftDescendant(node);
        }
        rightAncestor(node) {
            if (!node) return null;
            if (node.value < node.parent.value) return node.parent;
            else return rightAncestor(node.parent);
        }
        rangeSearch(x, y, R) {
            // input x and y with root R, return a list of nodes with keys between x and y
            let nodes = [];
            let node = find(x);
            while (node.key <= y) {
                if (node.key >= x) {
                    nodes.push(node);
                };
                node = next(node);
            };
            return nodes;
        }
    };
};