module.exports = function () {
  function Node (key) {
    this.key = key
    this.next = null
    this.prev = null
  }

  return function LinkedList () {
    this.tail = null
    this.head = null
    // Only methods can access these variables within the closure
    return {
      pushFront: (item) => {
        const newItem = new Node(item)
        if (this.head) {
          this.head.prev = newItem
          newItem.next = this.head
          this.head = newItem
        } else {
          this.head = newItem
          this.tail = newItem
        }
      },
      pushBack: (item) => {
        const newItem = new Node(item)
        if (this.tail) {
          newItem.prev = this.tail
          this.tail.next = newItem
          this.tail = newItem
        } else {
          this.tail = newItem
          this.head = newItem
        }
      },
      keyTopFront: () => {
        return this.head.key
      },
      keyTopBack: () => {
        return this.tail.key
      }
    }
  }
}
