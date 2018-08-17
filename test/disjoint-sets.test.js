const chai = require('chai')
const assert = chai.assert
const DisjointSets = require('../lib/disjoint-sets')

describe('tests out the disjoint sets data structure', () => {
  let startingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let newDisjointOne = new DisjointSets(startingArray)
  let newDisjointTwo
  let newDisjointThree

  it('tests that the rank size is the same as parent on init', () => {
    assert.equal(newDisjointOne.parent.length, newDisjointOne.rank.length)
    assert.deepEqual(newDisjointOne.rank, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('tests that find works for three values in startingArray', () => {
    assert.equal(6, newDisjointOne.find(6))
    assert.equal(7, newDisjointOne.find(7))
    assert.equal(0, newDisjointOne.find(0))
  })

  it('forms 3 disjoint sets by calling union command', () => {
    newDisjointOne.union(6, 7)
    newDisjointOne.union(8, 9)
    newDisjointOne.union(6, 8)
    newDisjointOne.union(0, 2)
    newDisjointOne.union(0, 1)
    newDisjointOne.union(0, 3)
    newDisjointOne.union(4, 5)
    assert.deepEqual(newDisjointOne.parent, [2, 2, 2, 2, 5, 5, 7, 9, 9, 9])
    assert.deepEqual(newDisjointOne.rank, [0, 0, 1, 0, 0, 1, 0, 1, 0, 2])
  })

  it('tests that path compression works recursively', () => {
    newDisjointTwo = new DisjointSets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    newDisjointTwo.unionRecur(6, 7)
    newDisjointTwo.unionRecur(8, 9)
    newDisjointTwo.unionRecur(6, 8)
    newDisjointTwo.unionRecur(0, 2)
    newDisjointTwo.unionRecur(0, 1)
    newDisjointTwo.unionRecur(0, 3)
    newDisjointTwo.unionRecur(4, 5)
    assert.deepEqual(newDisjointTwo.parent, [2, 2, 2, 2, 5, 5, 7, 9, 9, 9])
    assert.deepEqual(newDisjointTwo.rank, [0, 0, 1, 0, 0, 1, 0, 1, 0, 2])
  })

  it('tests that path compression works iteratively', () => {
    newDisjointThree = new DisjointSets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    newDisjointThree.unionIter(6, 7)
    newDisjointThree.unionIter(8, 9)
    newDisjointThree.unionIter(6, 8)
    newDisjointThree.unionIter(0, 2)
    newDisjointThree.unionIter(0, 1)
    newDisjointThree.unionIter(0, 3)
    newDisjointThree.unionIter(4, 5)
    assert.deepEqual(newDisjointThree.parent, [2, 2, 2, 2, 5, 5, 7, 9, 9, 9])
    assert.deepEqual(newDisjointThree.rank, [0, 0, 1, 0, 0, 1, 0, 1, 0, 2])
  })
})
