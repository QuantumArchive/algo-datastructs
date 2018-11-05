const chai = require('chai')
const assert = chai.assert
const DoubleLinkedList = require('../lib/double-linked-list')()

describe('tests out linked list data structure', () => {
  const loadListFront = (linkedList, nodes = 10) => {
    for (let i = 0; i < nodes; i++) {
      linkedList.pushFront(i)
    }
  }

  // const loadListBack = (linkedList, nodes = 10) => {
  //   for (let i = 0; i < nodes; i++) {
  //     linkedList.pushBack(i)
  //   }
  // }

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
})
