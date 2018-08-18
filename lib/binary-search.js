module.exports = function binarySearch (array, value) {
  return value === array.find(element => element === value)
}
