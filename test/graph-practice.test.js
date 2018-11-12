const assert = require('chai').assert
const graphAlgos = require('../lib/graph-algos')

describe('graph testing', () => {
  const generateSimpleDag = () => {
    /*
      1 -> 3 -> 5
     /            \
    0              7
     \            /
      2 -> 4 -> 6
    */
    return [
      [1, 2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [7],
      []
    ]
  }

  it('can do depth first traversal', () => {
    const traversalPath = graphAlgos.dfs(generateSimpleDag())
    assert.deepEqual(traversalPath, [
      0, 1, 3, 5, 7, 2, 4, 6
    ])
  })

  it('can do breadth first traversal', () => {
    const traversalPath = graphAlgos.bfs(generateSimpleDag())
    assert.deepEqual(traversalPath, [
      0, 1, 2, 3, 4, 5, 6, 7
    ])
  })
})
