const chai = require('chai')
const assert = chai.assert
const DoubleLinkedList = require('../lib/double-linked-list')()

describe('tests out linked list data structure', () => {
  const loadListFront = (linkedList, nodes = 10) => {
    for (let i = 0; i < nodes; i++) {
      linkedList.pushFront(i)
    }
  }

  it('pushFront pushes item to front and keyTopFront returns it', () => {
    const linkedList = new DoubleLinkedList()
    const itemToLoad = 1000
    loadListFront(linkedList)
    linkedList.pushFront(itemToLoad)
    const frontItem = linkedList.keyTopFront()
    assert.equal(frontItem, itemToLoad)
  })

  it('keyTopFront and keyTopBack return the same key if there is only one Node', () => {
    const linkedList = new DoubleLinkedList()
    const itemToLoad = 1
    linkedList.pushFront(itemToLoad)
    const frontItem = linkedList.keyTopFront()
    const backItem = linkedList.keyTopBack()
    assert.equal(frontItem, backItem)
  })

  it('keyTopFront and keyTopBack return null if no nodes exist in linked list', () => {
    const linkedList = new DoubleLinkedList()
    assert.equal(linkedList.keyTopBack(), null)
    assert.equal(linkedList.keyTopFront(), null)
  })

  it('pushBack pushes item to back of the Linked List', () => {
    const linkedList = new DoubleLinkedList()
    const itemToLoad = 9999
    loadListFront(linkedList)
    linkedList.pushBack(itemToLoad)
    const frontItem = linkedList.keyTopFront()
    const backItem = linkedList.keyTopBack()
    assert.equal(frontItem, 9)
    assert.equal(backItem, itemToLoad)
  })

  it('pushBack sets item to head and tail if no nodes exist', () => {
    const linkedList = new DoubleLinkedList()
    const itemToLoad = 67
    linkedList.pushBack(itemToLoad)
    const frontItem = linkedList.keyTopFront()
    const backItem = linkedList.keyTopBack()
    assert.equal(frontItem, backItem)
  })

  it('find returns the node if it exists in the list', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 100)
    const node = linkedList.find(72)
    assert.isOk(node)
    assert.equal(node.key, 72)
  })

  it('find returns false if the node does not exist in the list', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 100)
    const node = linkedList.find(1001)
    assert.isNotOk(node)
    assert.equal(node, false)
  })

  it('popFront returns the head node and removes it from the list', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 100)
    const node = linkedList.popFront()
    const findResult = linkedList.find(node.key)
    assert.isOk(node)
    assert.equal(node.key, 99)
    assert.equal(findResult, false)
  })

  it('popFront returns the head node and sets head/tail to null if there are no other nodes in list', () => {
    const linkedList = new DoubleLinkedList()
    linkedList.pushFront(1)
    const node = linkedList.popFront()
    const findResult = linkedList.find(1)
    assert.isOk(node)
    assert.equal(node.key, 1)
    assert.equal(findResult, false)
    assert.equal(linkedList.getHead(), null)
    assert.equal(linkedList.getTail(), null)
  })

  it('popFront returns null if the head node does not exist', () => {
    const linkedList = new DoubleLinkedList()
    const node = linkedList.popFront()
    assert.equal(node, null)
  })

  it('popBack returns the tail node and removes it from the list', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 100)
    const node = linkedList.popBack()
    const findResult = linkedList.find(node.key)
    assert.isOk(node)
    assert.equal(node.key, 0)
    assert.equal(findResult, false)
  })

  it('popBack returns the tail node and sets head/tail to null if there are no other nodes in the list', () => {
    const linkedList = new DoubleLinkedList()
    linkedList.pushFront(1)
    const node = linkedList.popBack()
    const findResult = linkedList.find(1)
    assert.isOk(node)
    assert.equal(node.key, 1)
    assert.equal(findResult, false)
    assert.equal(linkedList.getHead(), null)
    assert.equal(linkedList.getTail(), null)
  })

  it('popBack returns null if the tail node does not exist', () => {
    const linkedList = new DoubleLinkedList()
    const node = linkedList.popBack()
    assert.equal(node, null)
  })

  it('addBefore adds the key before the given node', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 2)
    const node = linkedList.find(0)
    linkedList.addBefore(node, 10)
    const firstNode = linkedList.popFront()
    const addedNode = linkedList.popFront()
    assert.equal(firstNode.key, 1)
    assert.equal(addedNode.key, 10)
  })

  it('addBefore adds key and sets the new node as head if the targeted node was the head', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList)
    const node = linkedList.find(9)
    linkedList.addBefore(node, 10)
    const headKey = linkedList.keyTopFront()
    assert.equal(headKey, 10)
  })

  it('addBefore adds the key to the front if no node is passed', () => {
    const linkedList = new DoubleLinkedList()
    linkedList.addBefore(null, 10)
    const headKey = linkedList.keyTopFront()
    assert.equal(headKey, 10)
  })

  it('addAfter adds the key after the given node', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList, 2)
    const node = linkedList.find(1)
    linkedList.addAfter(node, 10)
    const firstNode = linkedList.popBack()
    const addedNode = linkedList.popBack()
    assert.equal(firstNode.key, 0)
    assert.equal(addedNode.key, 10)
  })

  it('addAfter adds key and sets the new node as the tail if the targeted node was the tail', () => {
    const linkedList = new DoubleLinkedList()
    loadListFront(linkedList)
    const node = linkedList.find(0)
    linkedList.addAfter(node, 10)
    const tailKey = linkedList.keyTopBack()
    assert.equal(tailKey, 10)
  })

  it('addAfter adds the key to the back if no node is passed', () => {
    const linkedList = new DoubleLinkedList()
    linkedList.addAfter(null, 10)
    const tailKey = linkedList.keyTopBack()
    assert.equal(tailKey, 10)
  })
})
