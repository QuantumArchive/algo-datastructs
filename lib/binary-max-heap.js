module.exports = class BinaryMaxHeap {
  constructor (maxSize = Infinity) { // input can be an array or a value
    this.heapStruct = []
    this.size = 0
    this.maxSize = maxSize
  }
  swapParent (index) {
    // assumes the given node at given index will be swapped with parent
    let nodeToSwap = this.heapStruct[index]
    this.heapStruct[index] = this.heapStruct[this.parent(index)]
    this.heapStruct[this.parent(index)] = nodeToSwap
  }
  siftUp (index) {
    while (index > 0 && this.heapStruct[this.parent(index)] < this.heapStruct[index]) {
      this.swapParent(index)
      index = this.parent(index)
    }
  }
  siftDown (index) {
    let maxIndex = index
    let l = this.leftChild(index)
    // must be less then the current size
    if (l <= this.size && this.heapStruct[l] > this.heapStruct[maxIndex]) {
      maxIndex = l
    };
    let r = this.rightChild(index)
    if (r <= this.size && this.heapStruct[r] > this.heapStruct[maxIndex]) {
      maxIndex = r
    }
    if (index !== maxIndex) {
      this.swapParent(maxIndex)
      this.siftDown(maxIndex)
    }
  }
  insert (value) {
    if (this.size === this.maxSize) {
      throw new Error('Error, cannot insert any more values into the heap.')
    }
    this.size += 1
    let insertIndex = this.size - 1
    // this only works because JS silently allows you to attach new elements to indexes that don't exist'
    this.heapStruct[insertIndex] = value
    this.siftUp(insertIndex)
  }
  extractMax () {
    let result = this.heapStruct[0]
    this.heapStruct[0] = this.heapStruct[(this.size - 1)]
    this.size -= 1
    this.siftDown(0)
    this.heapStruct.pop()
    return result
  }
  remove (index) {
    this.heapStruct[index] = Infinity
    this.siftUp(index)
    this.extractMax()
  }
  changePriority (index, newPriority) {
    let oldPriority = this.heapStruct[index]
    this.heapStruct[index] = newPriority
    if (newPriority > oldPriority) this.siftUp(index)
    else this.siftDown(index)
  }
  // parent, leftChild, rightChild all assume 0-based indexing of your arrays
  parent (index) {
    return Math.floor((index - 1) / 2)
  }
  leftChild (index) {
    return 2 * index + 1
  }
  rightChild (index) {
    return 2 * index + 2
  }
}
