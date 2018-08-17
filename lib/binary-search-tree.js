'use strict'

const Queue = require('./queue')()

module.exports = function () {
  class BSTNode {
    constructor (value) {
      this.value = value
      this.parent = this.left = this.right = null
    }
  }

  return class BinarySearchTree {
    constructor () {
      this.root = null
    }
    find (key, root = this.root) {
      // v1.1 if no root value given, start at tree root
      // ideally what I want is an iterative solution
      // that returns a node if it's not present so then
      // we can go ahead and insert a new node there for
      // the insertion of a new node
      if (!root) return null
      let q = root
      let searching = true
      while (searching) {
        if (q.value === key) {
          searching = false
        } else if (q.value > key) {
          if (q.left) q = q.left
          else searching = false
        } else {
          if (q.right) q = q.right
          else searching = false
        }
      }
      return q
    }
    next (node) {
      // node in the tree with next largest key
      if (node.right) return this.leftDescendant(node.right)
      else return this.rightAncestor(node)
    }
    // see if I can convert these to iterative methods
    leftDescendant (node) {
      if (!node.left) return node
      else return this.leftDescendant(node.left)
    }
    rightAncestor (node) {
      if (!node) return null
      if (node.value <= node.parent.value) return node.parent
      else return this.rightAncestor(node.parent)
    }
    rangeSearch (x, y) {
      // input x and y, return a list of nodes with keys between x and y, always start at root
      let nodes = []
      let node = this.find(x)
      while (node.key <= y) {
        if (node.key >= x) nodes.push(node)
        node = this.next(node)
      }
      return nodes
    }
    insert (key) {
      let keyNode = new BSTNode(key)
      if (!this.root) {
        this.root = keyNode
        return
      }
      let parent = this.find(key)
      let leftChild = parent.left
      let rightChild = parent.right
      let searching = true
      while (searching) {
        if (key <= parent.value && !leftChild) {
          keyNode.parent = parent
          parent.left = keyNode
          searching = false
        } else if (key > parent.value && !rightChild) {
          keyNode.parent = parent
          parent.right = keyNode
          searching = false
        } else {
          if (key <= parent.value) {
            parent = this.find(key, parent.left)
            leftChild = parent.left
            rightChild = parent.right
          } else {
            parent = this.find(key, parent.right)
            leftChild = parent.left
            rightChild = parent.right
          }
        }
      }
    }
    delete (key) {
      let node = this.find(key)
      if (node.value !== key) return
      if (!node.right) {
        return this.promote(node.left, node)
      } else {
        let xNode = this.next(node)
        let replacementNode = this.promote(xNode.right, xNode)
        return this.replace(node, replacementNode)
      }
    }
    promote (promoteNode, parent) {
      // promote a given node to its parents position and return the parent
      let grandparent = parent.parent

      // case of shallow trees
      if (!promoteNode) {
        if (!grandparent) { // then we're at the root and root has no children
          this.root = null
          return parent
        } else {
          parent.parent = null
          if (parent === grandparent.left) grandparent.left = null
          else grandparent.right = null
          return parent
        }
      }

      if (!grandparent) {
        // we are at the root if there is no grandparent
        this.root = promoteNode
        promoteNode.parent = null
        parent.left = null
        return parent
      } else {
        if (parent === grandparent.left) grandparent.left = promoteNode
        else grandparent.right = promoteNode
        promoteNode.parent = grandparent
        parent.left = null
        parent.parent = null
        return parent
      }
    }
    replace (oldNode, newNode) {
      // replace the oldNode with the newNode and return the oldNode
      // assume the newNode is not connected to anything

      let parent = oldNode.parent
      let left = oldNode.left
      let right = oldNode.right
      oldNode.parent = oldNode.left = oldNode.right = null

      if (oldNode === this.root) this.root = newNode

      newNode.parent = parent
      newNode.left = left
      newNode.right = right

      return oldNode
    }
    depthFirst () {
      if (!this.root) return
      let depthFirstStack = []
      let nodes = []
      let search = true
      let q = this.root
      while (search) {
        if (q) {
          depthFirstStack.push(q)
          q = q.left
        } else {
          if (!depthFirstStack.length) search = false
          else {
            q = depthFirstStack.pop()
            nodes.push(q)
            q = q.right
          }
        }
      }
      return nodes
    }
    breadthFirst () {
      if (!this.root) return
      let nodeQ = new Queue()
      nodeQ.enqueue(this.root)
      let nodes = []
      while (nodeQ.checkEmpty()) {
        let q = nodeQ.dequeue().value
        if (q.left) nodeQ.enqueue(q.left)
        if (q.right) nodeQ.enqueue(q.right)
        nodes.push(q)
      }
      return nodes
    }
  }
}
