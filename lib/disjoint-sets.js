module.exports = class DisjointSets {
  constructor (parent = []) {
    // assuming no joins have been initiated on initial
    this.parent = parent
    this.rank = []
    this.parent.forEach(() => {
      this.rank.push(0)
    })
    this.clusters = 0
  }
  makeSet (index) {
    this.parent[index] = index
    this.rank[index] = 0
    this.clusters += 1
  }
  find (index) {
    while (index !== this.parent[index]) {
      index = this.parent[index]
    }
    return index
  }
  findPathCompressIterative (index) {
    if (index !== this.parent[index]) {
      let parent = this.parent[index]
      let child = index

      while (child !== parent) {
        child = parent
        parent = this.parent[parent]
      }

      this.parent[index] = parent
    }
    return this.parent[index]
  }
  findPathCompressRecursive (index) {
    if (index !== this.parent[index]) {
      this.parent[index] = this.findPathCompressRecursive(this.parent[index])
    }
    return this.parent[index]
  }
  union (i, j) {
    let iId = this.find(i)
    let jId = this.find(j)
    if (iId === jId) return
    if (this.rank[iId] > this.rank[jId]) {
      this.clusters -= 1
      this.parent[jId] = iId
    } else {
      this.clusters -= 1
      this.parent[iId] = jId
      if (this.rank[iId] === this.rank[jId]) {
        this.rank[jId] += 1
      }
    }
  }
  unionIter (i, j) {
    let iId = this.findPathCompressIterative(i)
    let jId = this.findPathCompressIterative(j)
    if (iId === jId) return
    if (this.rank[iId] > this.rank[jId]) {
      this.clusters -= 1
      this.parent[jId] = iId
    } else {
      this.clusters -= 1
      this.parent[iId] = jId
      if (this.rank[iId] === this.rank[jId]) {
        this.rank[jId] += 1
      }
    }
  }
  unionRecur (i, j) {
    let iId = this.findPathCompressRecursive(i)
    let jId = this.findPathCompressRecursive(j)
    if (iId === jId) return
    if (this.rank[iId] > this.rank[jId]) {
      this.clusters -= 1
      this.parent[jId] = iId
    } else {
      this.clusters -= 1
      this.parent[iId] = jId
      if (this.rank[iId] === this.rank[jId]) {
        this.rank[jId] += 1
      }
    }
  }
}
