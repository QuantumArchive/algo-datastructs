const chai = require('chai')
const assert = chai.assert
const Queue = require('../lib/queue')()

describe('tests out the queue data structure', () => {
  it('tests enqueue and dequeue one value', () => {
    let testQueue = new Queue()
    testQueue.enqueue(1)
    assert.equal(testQueue.dequeue().value, 1)
    assert.isNull(testQueue.checkHead())
  })

  it('tests enqueue and dequeue multiple values', () => {
    let testQueue = new Queue()
    let arrayOfNumbers = [1, 2, 3, 4, 5]
    arrayOfNumbers.forEach(element => {
      testQueue.enqueue(element)
    })
    assert.equal(testQueue.dequeue().value, 1)
    assert.equal(testQueue.dequeue().value, 2)
    assert.equal(testQueue.dequeue().value, 3)
    assert.equal(testQueue.dequeue().value, 4)
    assert.equal(testQueue.dequeue().value, 5)
    assert.isNull(testQueue.checkHead())
  })

  it('tests that dequeue-ing is O(1) in time complexity', () => {
    let testQueue = new Queue()
    let arrayOfNumbers = Array.apply(null, Array(100000)).map((element, index) => {
      testQueue.enqueue(index)
      return index
    })
    // console.time();
    // for(let i = arrayOfNumbers.length; 0 < i; i--) {
    //     arrayOfNumbers.shift();
    // };
    // console.timeEnd();
    console.time()
    for (let i = 0; i < arrayOfNumbers.length; i++) {
      assert.equal(testQueue.dequeue().value, arrayOfNumbers[i])
    };
    console.timeEnd()
  }).timeout(1000)
})
