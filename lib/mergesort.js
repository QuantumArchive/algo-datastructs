module.exports = function () {
  function pushRemaining (newArray, oldArray, index) {
    for (let l = index; l < oldArray.length; l++) {
      newArray.push(oldArray[l])
    }
    return newArray
  }

  function merge (arrayA, arrayB) {
    let i = 0; let k = 0; let newArray = []
    while (i < arrayA.length && k < arrayB.length) {
      if (arrayA[i] < arrayB[k]) {
        newArray.push(arrayA[i])
        i += 1
      } else {
        newArray.push(arrayB[k])
        k += 1
      }
    }

    if (i < arrayA.length) newArray = pushRemaining(newArray, arrayA, i)
    if (k < arrayB.length) newArray = pushRemaining(newArray, arrayB, k)

    return newArray
  }

  return function mergeSort (array) {
    if (array.length <= 1) return array

    let right = array.length
    let left = Math.floor(right / 2)

    let A = mergeSort(array.slice(0, left))
    let B = mergeSort(array.slice(left, right))
    let C = merge(A, B)

    return C
  }
}
