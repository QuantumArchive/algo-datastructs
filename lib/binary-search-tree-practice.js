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
  delete (node) {
    if (node.right) {
      const nextNode = this.next(node)
      this.promote(nextNode.right)
      this.replace(node, nextNode)
    } else {
      const parent = node.parent
      this.promote(node.left)
      node.left = null
      node.parent = null
      if (parent.left === node) {
        parent.left = null
      } else {
        parent.right = null
      }
    }
    return node
  }
  // promote a node to parents position
  // return the parent node and subtree that was not promoted attached to parent
  promote (node) {
    if (!node) {
      return
    }

    const parent = node.parent

    if (!parent) {
      return
    }

    const grandparent = parent.parent

    // set the node to the proper grandparent side
    if (grandparent && parent === grandparent.left) {
      grandparent.left = node
    } else if (grandparent) {
      grandparent.right = node
    } else {
      this.root = node
    }
    node.parent = grandparent

    if (parent.left === node) {
      parent.left = null
    } else {
      parent.right = null
    }

    parent.parent = null

    // parent would still have the leftover subtree of the side that did not get promoted
    return parent
  }
  replace (nodeToReplace, node) {
    const nodeChildLeft = nodeToReplace.left
    const nodeChildRight = nodeToReplace.right
    const nodeParent = nodeToReplace.parent

    node.left = nodeChildLeft
    node.right = nodeChildRight
    node.parent = nodeParent

    if (this.root === nodeToReplace) {
      this.root = node
    }

    nodeChildLeft.parent = node
    nodeChildRight.parent = node

    if (nodeToReplace === nodeParent.left) {
      nodeParent.left = node
    } else {
      nodeParent.right = node
    }

    nodeToReplace.left = null
    nodeToReplace.right = null
    nodeToReplace.parent = null

    return nodeToReplace
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
