const random = require('./random');

module.exports = function() {

    function swap(array, pivotIndex, swappedIndex) {
        let valueToSwap = array[pivotIndex];
        array[pivotIndex] = array[swappedIndex];
        array[swappedIndex] = valueToSwap; 
    };

    function partition(array, leftIndex, rightIndex) {
        let pivot = array[leftIndex]; 
        let arrayIndex = leftIndex + 1;
        let leftPivotIndex = leftIndex;
        let rightPivotIndex = rightIndex;
        while (arrayIndex <= rightPivotIndex) {
            if(array[arrayIndex] < pivot) {
                swap(array, leftPivotIndex, arrayIndex);
                leftPivotIndex += 1;
                arrayIndex += 1;
            } else if (array[arrayIndex] > pivot) {
                swap(array, rightPivotIndex, arrayIndex);
                rightPivotIndex -= 1;
            } else {
                arrayIndex += 1;
            };
        };
        return [leftPivotIndex, rightPivotIndex];
    };

    return function quickSort3(array, leftIndex = 0, rightIndex = (array.length - 1)) {
        if (rightIndex <= leftIndex) return;
        let randomIndex = random(leftIndex, rightIndex);
        swap(array, leftIndex, randomIndex);

        let [pl, pr] = partition(array, leftIndex, rightIndex);
        quickSort3(array, leftIndex, pl - 1);
        quickSort3(array, pr + 1, rightIndex);
        return array;
    };
};