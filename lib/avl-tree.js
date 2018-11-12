class AVLTNode {
  constructor (key, height) {
    this.key = key || null
    this.height = height || null
    this.parent = null
    this.left = null
    this.right = null
  }
}

class AVLTree {
  constructor (root) {
    this.root = root || null
    this.size = 0
  }
  getRoot () {
    return this.root
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
    const newNode = new AVLTNode(key)
    const newParent = this.find(key)
    const leftChildren = newParent.left
    const rightChildren = newParent.right
    const leftHeight = leftChildren ? leftChildren.height : 0
    const rightHeight = rightChildren ? rightChildren.height : 0
    const maxHeight = Math.max(leftHeight, rightHeight) + 1

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
    newNode.height = maxHeight

    if (!this.root) {
      this.root = newNode
    }

    this.size += 1
    return newNode
  }
  avlInsert (key) {
    this.insert(key)
    const node = this.find(key)
    this.rebalance(node)
  }
  rebalance (node) {
    const parent = node.parent
    const leftHeight = node.left ? node.left.height : 0
    const rightHeight = node.right ? node.right.height : 0
    if (leftHeight > (rightHeight + 1)) {
      this.rebalanceRight(node)
    }
    if (rightHeight > (leftHeight + 1)) {
      this.rebalanceLeft(node)
    }
    this.adjustHeight(node)
    if (parent) {
      this.rebalance(parent)
    }
  }
  rebalanceRight (node) {
    const leftNode = node.left
    const leftNodeLeftTreeHeight = leftNode.left ? leftNode.left.height : 0
    const leftNodeRightTreeHeight = leftNode.right ? leftNode.right.height : 0
    if (leftNodeRightTreeHeight > leftNodeLeftTreeHeight) {
      this.rotateLeft(leftNode)
    }
    this.rotateRight(node)
  }
  rotateLeft (node) {
    const parent = node.parent
    const nodeRight = node.right
    const nodeRightLeftChild = nodeRight ? nodeRight.left : null

    if (parent && parent.left === node) {
      parent.left = nodeRight
    } else if (parent && parent.right === node) {
      parent.right = nodeRight
    } else {
      this.root = nodeRight
    }

    if (nodeRight) {
      nodeRight.parent = parent
      nodeRight.left = node
    }

    if (nodeRightLeftChild) {
      nodeRightLeftChild.parent = node
      node.right = nodeRightLeftChild
    }

    node.parent = nodeRight
  }
  rotateRight (node) {
    const parent = node.parent
    const nodeLeft = node.left
    const nodeLeftRightChild = nodeLeft ? nodeLeft.right : null

    if (parent && parent.left === node) {
      parent.left = nodeLeft
    } else if (parent && parent.right === node) {
      parent.right = nodeLeft
    } else {
      this.root = nodeLeft
    }

    if (nodeLeft) {
      nodeLeft.parent = parent
      nodeLeft.right = node
    }

    if (nodeLeftRightChild) {
      nodeLeftRightChild.parent = node
      node.left = nodeLeftRightChild
    }

    node.parent = nodeLeft
  }
  rebalanceLeft (node) {
    const rightNode = node.right
    const rightNodeLeftTreeHeight = rightNode.left ? rightNode.left.height : 0
    const leftNodeRightTreeHeight = rightNode.right ? rightNode.right.height : 0
    if (rightNodeLeftTreeHeight > leftNodeRightTreeHeight) {
      this.rotateRight(rightNode)
    }
    this.rotateLeft(node)
  }
  adjustHeight (node) {
    const leftHeight = node.left ? node.left.height : 0
    const rightHeight = node.right ? node.right.height : 0
    node.height = Math.max(leftHeight, rightHeight) + 1
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
    this.size -= 1
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
  AVLTNode,
  AVLTree
}
