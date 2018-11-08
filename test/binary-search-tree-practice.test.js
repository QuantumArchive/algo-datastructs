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
    const rootNode = new BSTNode(5)
    const nodeThree = new BSTNode(3)
    const nodeSeven = new BSTNode(7)
    attachNodes(rootNode, nodeThree, nodeSeven)
    const nodeOne = new BSTNode(1)
    const nodeFour = new BSTNode(4)
    attachNodes(nodeThree, nodeOne, nodeFour)
    const nodeSix = new BSTNode(6)
    const nodeEight = new BSTNode(8)
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
    xit('finds the next largest key within the tree', () => {
      const { tree, nodeFour, nodeSix } = buildSmallTree()
      const firstNode = tree.next(nodeFour)
      assert.equal(firstNode.key, 5)
      const secondNode = tree.next(nodeSix)
      assert.equal(secondNode.key, 7)
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
  })
})