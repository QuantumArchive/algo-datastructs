'use strict';

const Queue = require('../lib/queue')();

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
            // look within your tree using binary search for a given key
            // and return that specific node
            return -1;
        }
        next(node) {
        // node in the tree with next largest key
            return -1;
        }
        // see if I can convert these to iterative methods
        leftDescendant(node) {
            // return the left most descendent of a given node, can implement recursively
            return -1;
        }
        rightAncestor(node) {
            // return the right ancestor of a given node, can implement recursively
            return -1;
        }
        rangeSearch(x, y) {
            // input x and y, return a list of nodes with keys between x and y, always start at root
            return -1;
        }
        insert(key) {
            let keyNode = new BSTNode(key);
            // Implement insert here
            return -1;
        }
        delete(key) {
            // Delete a node with given key and return it
            return -1;
        }
        promote(promoteNode, parent) {
            // NOTE: Helper function you can implement
            // promote a given node to its parents position and return the parent
            return -1;
        }
        replace(oldNode, newNode) {
            // NOTE: Helper function you can implement
            // replace the oldNode with the newNode and return the oldNode
            // assume the newNode is not connected to anything
            return -1;
        }
        depthFirst() {
            // Implement depthFirst search here, recommend using a STACK data structure
            return -1;
        }
        breadthFirst() {
            // Implement breadFirst search here, recommend using a QUEUE data structure
            return -1;
        }
    };
};