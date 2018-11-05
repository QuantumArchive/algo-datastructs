module.exports = function () {
  function Node (key, value) {
    this.key = key
    this.value = value || null
    this.next = null
    this.prev = null
    this.setValue = function (value) {
      this.value = value
    }
  }

  return class LinkedList {
    constructor () {
      this.tail = null
      this.head = null
    }
    pushFront (key, value) {
      const newItem = new Node(key, value)
      if (this.head) {
        this.head.prev = newItem
        newItem.next = this.head
        this.head = newItem
      } else {
        this.head = newItem
        this.tail = newItem
      }
    }
    pushBack (key, value) {
      const newItem = new Node(key, value)
      if (this.tail) {
        newItem.prev = this.tail
        this.tail.next = newItem
        this.tail = newItem
      } else {
        this.tail = newItem
        this.head = newItem
      }
    }
    keyTopFront () {
      return this.head && this.head.key
    }
    getHead () {
      return this.head
    }
    getTail () {
      return this.tail
    }
    keyTopBack () {
      return this.tail && this.tail.key
    }
    find (key) {
      let currentNode = this.head
      while (currentNode) {
        if (currentNode.key === key) {
          return currentNode
        } else {
          currentNode = currentNode.next
        }
      }
      return false
    }
    popFront () {
      if (!this.head) {
        return null
      }
      const returnNode = this.head
      const nextNode = this.head.next
      returnNode.next = null
      if (nextNode) {
        nextNode.prev = null
        this.head = nextNode
      } else {
        this.head = null
        this.tail = null
      }
      return returnNode
    }
    popBack () {
      if (!this.tail) {
        return null
      }
      const returnNode = this.tail
      const prevNode = this.tail.prev
      returnNode.prev = null
      if (prevNode) {
        prevNode.next = null
        this.tail = prevNode
      } else {
        this.head = null
        this.tail = null
      }
      return returnNode
    }
    addBefore (node, key, value) {
      if (!node) {
        return this.pushFront(key, value)
      }

      const prevNode = node.prev

      if (!prevNode) {
        return this.pushFront(key, value)
      }

      const newNode = new Node(key, value)

      node.prev = newNode
      prevNode.next = newNode
      newNode.next = node
      newNode.prev = prevNode
    }
    addAfter (node, key, value) {
      if (!node) {
        return this.pushBack(key, value)
      }

      const nextNode = node.next

      if (!nextNode) {
        return this.pushBack(key, value)
      }

      const newNode = new Node(key, value)

      node.next = newNode
      nextNode.prev = newNode
      newNode.next = nextNode
      newNode.prev = node
    }
    removeNode (node) {
      const prevNode = node.prev
      const nextNode = node.next
      node.next = null
      node.prev = null

      if (!prevNode) {
        this.head = nextNode
      } else {
        prevNode.next = nextNode
      }

      if (!nextNode) {
        this.tail = prevNode
      } else {
        nextNode.prev = prevNode
      }
    }
    forEach (callback) {
      let currentNode = this.head
      let index = 0
      while (currentNode) {
        callback(currentNode, index)
        currentNode = currentNode.next
        index++
      }
    }
  }
}
