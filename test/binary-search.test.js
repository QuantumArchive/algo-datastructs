const chai = require('chai')
const assert = chai.assert
const binarySearch = require('../lib/binary-search')

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

  it('takes a large array and finds the last item in the alotted time', () => {

  })
})
