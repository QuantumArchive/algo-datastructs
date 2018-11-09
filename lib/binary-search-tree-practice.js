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
  // find the node with the next highest key
  next (node) {
    if (node.right) {
      return this.leftDescendant(node.right)
    } else {
      return this.rightAncestor(node)
    }
  }
  // find the left most descendent
  leftDescendant (node) {
    let currNode = node
    while (currNode.left) {
      currNode = currNode.left
    }
    return currNode
  }
  // find the right-most ancestor
  // nodes on the right limb/branch that are greater then root will all return null
  rightAncestor (node) {
    let parent = node.parent
    let currNode = node
    while (parent && parent.key < currNode.key) {
      parent = parent.parent
      currNode = currNode.parent
    }
    return parent
  }
  // return nodes between the given range
  rangeSearch (x, y) {
    const nodes = []
    let node = this.find(x)
    while (node && node.key <= y) {
      if (node.key >= x) {
        nodes.push(node)
      }
      node = this.next(node)
    }
    return nodes
  }
  insert (key) {
    const newNode = new BSTNode(key)
    const newParent = this.find(key)
    const leftChildren = newParent.left
    const rightChildren = newParent.right

    if (newParent.key >= newNode.key) {
      newNode.left = leftChildren
      newParent.left = newNode
      if (leftChildren) {
        leftChildren.parent = newNode
      }
    } else {
      newNode.right = rightChildren
      newParent.right = newNode
      if (rightChildren) {
        rightChildren.parent = newNode
      }
    }
    newNode.parent = newParent
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
