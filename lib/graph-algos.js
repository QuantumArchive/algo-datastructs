const Queue = require('./queue')()

module.exports = {
  // ensure that node 0 is always the starting point
  dfs: (adjacencyList) => {
    const visitedArray = Array
      .apply(null, Array(adjacencyList.length))
      .map(() => false)

    const nodesVisited = []
    const nodesToVisit = [0]

    const explore = (node) => {
      const nodesToExplore = adjacencyList[node]
      nodesToExplore.forEach(adjN => {
        if (!visitedArray[adjN]) {
          nodesToVisit.push(adjN)
        }
      })
    }

    while (nodesToVisit.length) {
      const nodeToVisit = nodesToVisit.pop()
      if (!visitedArray[nodeToVisit]) {
        visitedArray[nodeToVisit] = true
        nodesVisited.push(nodeToVisit)
        explore(nodeToVisit)
      }
    }

    return nodesVisited
  },
  // ensure that node 0 is always the starting point
  bfs: (adjacencyList) => {
    const visitedArray = Array
      .apply(null, Array(adjacencyList.length))
      .map(() => false)

    const nodesVisited = []
    const nodesToVisit = new Queue()
    nodesToVisit.enqueue(0)

    const explore = (node) => {
      const nodesToExplore = adjacencyList[node]
      nodesToExplore.forEach(adjN => {
        if (!visitedArray[adjN]) {
          nodesToVisit.enqueue(adjN)
        }
      })
    }

    while (nodesToVisit.checkEmpty()) {
      const nodeToVisit = nodesToVisit.dequeue().value
      if (!visitedArray[nodeToVisit]) {
        visitedArray[nodeToVisit] = true
        nodesVisited.push(nodeToVisit)
        explore(nodeToVisit)
      }
    }

    return nodesVisited
  }
}
