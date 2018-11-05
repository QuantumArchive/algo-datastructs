const LinkedList = require('./double-linked-list')()

module.exports = class HashTable {
  constructor () {
    this.list = [new LinkedList()]
    this.cardinality = this.list.length
  }
  hashFunction (key) {

  }
  hasKey (key) {
    const returnedList = this.list[this.hashFunction(key)]
    const result = returnedList.find(key)
    if (result && result.key === key) {
      return true
    }
    return false
  }
  get (key) {
    const returnedList = this.list[this.hashFunction(key)]
    const result = returnedList.find(key)
    if (result && result.key === key) {
      return result.value
    }
    return null
  }
  set (key, value) {
    const returnedList = this.list[this.hashFunction(key)]
    const result = returnedList.find(key)
    if (result && result.key === key) {
      result.setValue(value)
    } else {
      returnedList.pushBack(key, value)
    }
  }
  remove (key) {
    const returnedList = this.list[this.hashFunction(key)]
    const result = returnedList.find(key)
    if (result && result.key === key) {
      returnedList.removeNode(result)
      return result
    }
    return null
  }
}
