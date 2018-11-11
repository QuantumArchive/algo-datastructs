const chai = require('chai')
const assert = chai.assert
const { BSTree, BSTNode } = require('../lib/binary-search-tree-practice')

describe('binary-search-tree-practice', () => {
  const attachNodes = (parent, leftChild = null, rightChild = null) => {
    parent.left = leftChild
    parent.right = rightChild
    if (leftChild) {
      leftChild.parent = parent
    }
    if (rightChild) {
      rightChild.parent = parent
    }
  }

  /*
    Build a simple tree to iterate tests on
          5
        /   \
       3     7
      / \   / \
     1   4  6  8
  */
  const buildSmallTree = () => {
    const rootNode = new BSTNode(5, 3)
    const nodeThree = new BSTNode(3, 2)
    const nodeSeven = new BSTNode(7, 2)
    attachNodes(rootNode, nodeThree, nodeSeven)
    const nodeOne = new BSTNode(1, 1)
    const nodeFour = new BSTNode(4, 1)
    attachNodes(nodeThree, nodeOne, nodeFour)
    const nodeSix = new BSTNode(6, 1)
    const nodeEight = new BSTNode(8, 1)
    attachNodes(nodeSeven, nodeSix, nodeEight)
    const tree = new BSTree(rootNode)
    return {
      tree,
      rootNode,
      nodeThree,
      nodeSeven,
      nodeOne,
      nodeFour,
      nodeSix,
      nodeEight
    }
  }

  describe('find', () => {
    it('will discover the node if it exists within the tree', () => {
      const { tree } = buildSmallTree()
      const nodeOne = tree.find(5)
      assert.equal(nodeOne.key, 5)
      const nodeTwo = tree.find(7)
      assert.equal(nodeTwo.key, 7)
      const nodeThree = tree.find(1)
      assert.equal(nodeThree.key, 1)
    })

    it('returns the closest node to the key if it does not exist', () => {
      const { tree } = buildSmallTree()
      const nodeOne = tree.find(9)
      assert.equal(nodeOne.key, 8)
      const nodeTwo = tree.find(0)
      assert.equal(nodeTwo.key, 1)
      const nodeThree = tree.find(2)
      assert.equal(nodeThree.key, 1)
    })
  })

  describe('next', () => {
    it('finds the next largest key within the tree', () => {
      const { tree, nodeFour, nodeSix } = buildSmallTree()
      const firstNode = tree.next(nodeFour)
      assert.equal(firstNode.key, 5)
      const secondNode = tree.next(nodeSix)
      assert.equal(secondNode.key, 7)
    })

    it('returns null if you pick the node that is the largest in value', () => {
      const { tree, nodeEight } = buildSmallTree()
      const node = tree.next(nodeEight)
      assert.equal(node, null)
    })
  })

  describe('leftDescendant', () => {
    it('returns the left most descendent within a tree given a node', () => {
      const { tree, nodeThree, nodeSeven } = buildSmallTree()
      const firstDescendent = tree.leftDescendant(nodeThree)
      assert.equal(firstDescendent.key, 1)
      const secondDescendant = tree.leftDescendant(nodeSeven)
      assert.equal(secondDescendant.key, 6)
    })
  })

  describe('rightAncestor', () => {
    it('returns the ancestor where ancestor key is greater then current node', () => {
      const { tree, nodeOne, nodeFour } = buildSmallTree()
      const ancestorCheck = tree.rightAncestor(nodeOne)
      assert.equal(ancestorCheck.key, 3)
      const ancestorCheckTwo = tree.rightAncestor(nodeFour)
      assert.equal(ancestorCheckTwo.key, 5)
    })

    it('returns null when the selected node is the node with largest value', () => {
      const { tree, nodeEight } = buildSmallTree()
      const node = tree.rightAncestor(nodeEight)
      assert.equal(node, null)
    })
  })

  describe('rangeSearch', () => {
    it('takes the range of the given inputs and returns all nodes with keys within that range', () => {
      const { tree } = buildSmallTree()
      const nodes = tree.rangeSearch(3, 7)
      assert.equal(nodes[0].key, 3)
      assert.equal(nodes[1].key, 4)
      assert.equal(nodes[2].key, 5)
      assert.equal(nodes[3].key, 6)
      assert.equal(nodes[4].key, 7)
    })

    it('returns an empty array if range falls outside of nodes in tree', () => {
      const { tree } = buildSmallTree()
      const nodes = tree.rangeSearch(9, 21)
      assert.equal(nodes.length, 0)
    })
  })

  describe('insert', () => {
    it('inserts a new leaf in the appropriate position to maintain binary search property', () => {
      const { tree } = buildSmallTree()
      tree.insert(2)
      const node = tree.find(2)
      const nodeParent = node.parent
      assert.equal(nodeParent.key, 1)
      assert.equal(nodeParent.right, node)
    })

    it('inserts a new node while respecting the binary search property and subtrees', () => {
      const { tree } = buildSmallTree()
      tree.insert(7)
      const node = tree.find(6)
      assert.equal(node.key, 6)
      assert.equal(node.parent.key, 7)
    })
  })

  describe('delete', () => {
    it('can delete a leaf node from the tree', () => {
      const { tree, nodeOne, nodeEight } = buildSmallTree()
      tree.delete(nodeOne)
      const returnedNode = tree.find(1)
      assert.equal(returnedNode.key, 3)
      tree.delete(nodeEight)
      const returnedNodeTwo = tree.find(8)
      assert.equal(returnedNodeTwo.key, 7)
    })

    it('can delete a node anywhere on the tree and still retain its binary search property', () => {
      const { tree, nodeSeven } = buildSmallTree()
      tree.delete(nodeSeven)
      const returnedNode = tree.find(7)
      assert.equal(returnedNode.key, 6)
      const returnedNodeEight = tree.find(8)
      assert.equal(returnedNodeEight.key, 8)
    })
  })
})
