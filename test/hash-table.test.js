const chai = require('chai')
const assert = chai.assert
const HashTable = require('../lib/hash-table')

describe('tests out hash table data structure', () => {
  it('can set and get key values', () => {
    const hashTable = new HashTable()
    hashTable.set('hello', 'world')
    const value = hashTable.get('hello')
    assert.equal(value, 'world')
  })
})
