const LinkedList = require('./double-linked-list')()

module.exports = class HashTable {
  constructor () {
    this.list = [new LinkedList()]
    this.cardinality = this.list.length
    this.totalKeys = 0
    this.loadFactor = this.totalKeys / this.cardinality
  }
  calculateLoadFactor () {
    this.loadFactor = this.totalKeys / this.cardinality
    return this.loadFactor
  }
  getHashFunction (cardinality) {

  }
  hashFunction (key) {

  }
  reHash () {
    const loadFactor = this.calculateLoadFactor()
    if (loadFactor > 0.9) {
      const newListSize = this.list.length * 2
      this.list = Array.apply(null, Array(newListSize)).map(() => new LinkedList())
      this.hashFunction = this.getHashFunction(newListSize)
      // for every key value pair in original list, insert into new table
    }
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
      this.totalKeys += 1
    }
  }
  remove (key) {
    const returnedList = this.list[this.hashFunction(key)]
    const result = returnedList.find(key)
    if (result && result.key === key) {
      returnedList.removeNode(result)
      this.totalKeys -= 1
      return result
    }
    return null
  }
}
