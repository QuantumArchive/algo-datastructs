module.exports = {
  sumIterative: function () {
    return function sumIterative (array) {
      return array.reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  sumRecursive: function () {
    return function sumRecursive (array, currIndex = array.length - 1, total = 0) {
      if (!currIndex) {
        total += array[currIndex]
        return total
      } else {
        total += array[currIndex]
        return sumRecursive(array, currIndex - 1, total)
      }
    }
  }
}
// TODO: look up tail recursion in JS
// Property testing...define test as a function...rule about inputs...testcheck.js
