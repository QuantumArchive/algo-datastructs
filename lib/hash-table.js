const LinkedList = require('./double-linked-list')()

module.exports = class HashTable {
  constructor () {
    this.list = [new LinkedList()]
    this.cardinality = this.list.length
    this.totalKeys = 0
    this.loadFactor = this.totalKeys / this.cardinality
    this.a = 34
    this.b = 2
    this.prime = 10000019
  }
  calculateLoadFactor () {
    this.loadFactor = this.totalKeys / this.cardinality
    return this.loadFactor
  }
  hashFunction (key) {
    // Ideally you choose random hash function on initiation and use it throughout
    // it has to be part of the family H(a,b,p)
    const hash = this.polyNomialHash(key)
    return ((this.a * hash + this.b) % this.prime) % this.cardinality
  }
  polyNomialHash (key) {
    // Ideally you choose a random polynomial hash function on initiation and use it throughout
    // it has to be part of family Pp where it is dependent solely on the prime number you choose
    let hash = 0
    for (let i = key.length - 1; i > -1; i--) {
      hash = (hash * this.a + key.charCodeAt(i)) % this.prime
    }
    return hash
  }
  reHash () {
    const loadFactor = this.calculateLoadFactor()
    if (loadFactor > 0.9) {
      const newListSize = this.list.length * 2
      const newList = Array.apply(null, Array(newListSize)).map(() => new LinkedList())

      const allKeyValues = []
      this.list.forEach(list => {
        list.forEach((node) => {
          allKeyValues.push({ key: node.key, value: node.value })
        })
      })

      this.cardinality = newListSize
      // as long as cardinality is updated can use old hash function
      this.list = newList

      allKeyValues.forEach(node => {
        this.set(node.key, node.value)
      })
    }
  }
  hasKey (key) {
    const stringifiedKey = key.toString()
    const returnedList = this.list[this.hashFunction(stringifiedKey)]
    const result = returnedList.find(stringifiedKey)
    if (result && result.key === stringifiedKey) {
      return true
    }
    return false
  }
  get (key) {
    const stringifiedKey = key.toString()
    const returnedList = this.list[this.hashFunction(stringifiedKey)]
    const result = returnedList.find(stringifiedKey)
    if (result && result.key === stringifiedKey) {
      return result.value
    }
    return null
  }
  set (key, value) {
    const stringifiedKey = key.toString()
    const returnedList = this.list[this.hashFunction(stringifiedKey)]
    const result = returnedList.find(stringifiedKey)
    if (result && result.key === stringifiedKey) {
      result.setValue(value)
    } else {
      returnedList.pushBack(stringifiedKey, value)
      this.totalKeys += 1
      this.reHash()
    }
  }
  remove (key) {
    const stringifiedKey = key.toString()
    const returnedList = this.list[this.hashFunction(stringifiedKey)]
    const result = returnedList.find(stringifiedKey)
    if (result && result.key === stringifiedKey) {
      returnedList.removeNode(result)
      this.totalKeys -= 1
      this.reHash()
      return result
    }
    return null
  }
}
