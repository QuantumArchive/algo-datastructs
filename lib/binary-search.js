function partitionCheck (
  array,
  value,
  leftIndex = 0,
  rightIndex = array.length - 1
) {
  const mid = Math.floor((rightIndex + leftIndex) / 2)
  if (leftIndex === rightIndex && array[mid] !== value) {
    return false
  } else if (array[mid] === value) {
    return true
  } else if (value > array[mid]) {
    return partitionCheck(array, value, mid + 1, rightIndex)
  } else if (value < array[mid]) {
    return partitionCheck(array, value, leftIndex, mid - 1)
  }
}

/**
 * Takes an array that is assumed to be sorted from lowest to highest and searches for the value
 *
 * @param {Array} array containing element to search for
 * @param {Integer} value you wish to search for
 */
module.exports = function binarySearch (array, value) {
  return partitionCheck(array, value)
}
