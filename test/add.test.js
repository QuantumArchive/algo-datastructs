const chai = require('chai')
const assert = chai.assert
const sumAlgos = require('../lib/add')
const sumIterative = sumAlgos.sumIterative()
const sumRecursive = sumAlgos.sumRecursive()

describe('tests out iterative and recursive sum solutions', () => {
  it('sumIterative and sumRecursive should return 0 when given a 0', () => {
    let testArrayOne = [0]
    assert.equal(sumIterative(testArrayOne), 0)
    assert.equal(sumRecursive(testArrayOne), 0)
  })

  it('sumIterative and sumRecursive should return the same values when given an array', () => {
    let testArrayTwo = [1, 2, 3]
    assert.equal(sumIterative(testArrayTwo), sumRecursive(testArrayTwo))
  })

  it('makes sure the recursive function can work for large arrays', () => {
    let testArrayThree = Array.from({ length: 5000 }, (_, i) => i + 1)
    console.time()
    assert.equal(sumRecursive(testArrayThree), 12502500)
    console.timeEnd()
  }).timeout(6000)
})
