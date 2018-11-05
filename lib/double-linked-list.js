module.exports = function () {
  function Node (key, value) {
    this.key = key
    this.value = value || null
    this.next = null
    this.prev = null
  }

  return class LinkedList {
    constructor () {
      this.tail = null
      this.head = null
    }
    pushFront (item) {
      const newItem = new Node(item)
      if (this.head) {
        this.head.prev = newItem
        newItem.next = this.head
        this.head = newItem
      } else {
        this.head = newItem
        this.tail = newItem
      }
    }
    pushBack (item) {
      const newItem = new Node(item)
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
    addBefore (node, key) {
      if (!node) {
        return this.pushFront(key)
      }

      const prevNode = node.prev

      if (!prevNode) {
        return this.pushFront(key)
      }

      const newNode = new Node(key)

      node.prev = newNode
      prevNode.next = newNode
      newNode.next = node
      newNode.prev = prevNode
    }
    addAfter (node, key) {
      if (!node) {
        return this.pushBack(key)
      }

      const nextNode = node.next

      if (!nextNode) {
        return this.pushBack(key)
      }

      const newNode = new Node(key)

      node.next = newNode
      nextNode.prev = newNode
      newNode.next = nextNode
      newNode.prev = node
    }
  }
}
