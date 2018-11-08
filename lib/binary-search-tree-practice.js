class BSTNode {
  constructor (key) {
    this.key = key || null
    this.parent = null
    this.left = null
    this.right = null
  }
}

class BSTree {
  constructor (root) {
    this.root = root || null
  }
  find (key) {
    let currNode = this.root
    let search = true
    while (search) {
      if (key < currNode.key && currNode.left) {
        currNode = currNode.left
      } else if (key > currNode.key && currNode.right) {
        currNode = currNode.right
      } else {
        search = false
      }
    }
    return currNode
  }
  next () {

  }
  leftDescendant () {

  }
  rightAncestor () {

  }
  rangeSearch () {

  }
  insert () {

  }
  delete () {

  }
  promote () {

  }
  replace () {

  }
  depthFirst () {

  }
  breadthFirst () {

  }
  getHeight () {

  }
  getSize () {

  }
}

module.exports = {
  BSTNode,
  BSTree
}
