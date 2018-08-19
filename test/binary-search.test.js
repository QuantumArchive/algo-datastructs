const chai = require('chai')
const assert = chai.assert
const binarySearch = require('../lib/binary-search')
const largeArray = Array.from({ length: 5000000 }, (_, i) => i + 1)

describe('test/binary-search', () => {
  it('takes an array and search value and returns true if the value exists in the array', () => {
    const label = 'binary search test 1'
    console.time(label)
    const value = binarySearch([1], 1)
    console.timeEnd(label)
    assert.ok(value)
  })

  it('takes an array and search value and returns false if the value does not exist in the array', () => {
    const label = 'binary search test 2'
    console.time(label)
    const value = binarySearch([2], 1)
    console.timeEnd(label)
    assert.ok(!value)
  })

  it('takes a small odd numbered array and search values and returns true if the value does exist', () => {
    const label = 'binary search test 3'
    console.time(label)
    const value = binarySearch([1, 2, 3, 4, 5], 3)
    console.timeEnd(label)
    assert.ok(value)
  })

  it('takes a small even numbered array and search values and returns true if the value does exist', () => {
    const label = 'binary search test 4'
    console.time(label)
    const value = binarySearch([1, 2, 3, 4, 5, 6], 6)
    console.timeEnd(label)
    assert.ok(value)
  })

  it('takes a large array and finds the last item in the alotted time', () => {
    const label = 'binary search test 5'
    console.time(label)
    const value = binarySearch(largeArray, 4985509)
    console.timeEnd(label)
    assert.ok(value)
  }).timeout(10)

  it('looks at time of naive solution for search through a large array', () => {
    const label = 'naive solution O(n)'
    console.time(label)
    const value = largeArray.find(number => number === 4985509)
    console.timeEnd(label)
    assert.ok(value)
  })
})
