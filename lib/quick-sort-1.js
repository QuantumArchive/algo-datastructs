module.exports = function () {
  function swap (array, pivotIndex, swappedIndex) {
    let valueToSwap = array[pivotIndex]
    array[pivotIndex] = array[swappedIndex]
    array[swappedIndex] = valueToSwap
  };

  function partition (array, leftIndex, rightIndex) {
    let pivot = array[leftIndex]
    let arrayIndex = leftIndex + 1
    let pivotIndex = leftIndex
    while (arrayIndex <= rightIndex) {
      if (array[arrayIndex] <= pivot) {
        pivotIndex += 1
        swap(array, pivotIndex, arrayIndex)
        arrayIndex += 1
      } else {
        arrayIndex += 1
      };
    };
    swap(array, pivotIndex, leftIndex)
    return pivotIndex
  };

  return function quickSort1 (array, leftIndex = 0, rightIndex = (array.length - 1)) {
    if (rightIndex <= leftIndex) return

    let p = partition(array, leftIndex, rightIndex)
    quickSort1(array, leftIndex, p - 1)
    quickSort1(array, p + 1, rightIndex)

    return array
  }
}
