module.exports = {
    sumIterative: function() {
        return function sumIterative(array) {
            return array.reduce((acc,curr) => {
                return acc + curr;
            }, 0);
        };
    },
    sumRecursive: function() {
        return function sumRecursive(array, currIndex = array.length - 1, total = 0) {
            if (!currIndex) return total += array[currIndex];
            else return sumRecursive(array, currIndex - 1, total += array[currIndex]);
        };
    },
};
