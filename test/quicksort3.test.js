const chai = require('chai');
const assert = chai.assert;
const quickSort3 = require('../lib/quick-sort-3')();

describe('tests out quick sort 3 algorithm', () => {
    let testArrayOne = [10,9,8,7,6,5,4,3,2,1];
    let testArrayTwo = [1,1,1,1,1,1,1,1,1,1];
    let testArrayThree = [10,1,4,10,2,10,2,1,5,8,10];
    let testArrayFive = [2,1,0];
    let testArraySix = [1000000,5,2,1,900000,1000001,600000000];

    it('looks to see if array returns in order of least to greatest', () => {
        quickSort3(testArrayOne);
        assert.deepEqual(testArrayOne, [1,2,3,4,5,6,7,8,9,10]);
    });

    it('looks to see if quickSort3 returns same array if array is repeating element', () => {
        quickSort3(testArrayTwo);
        assert.deepEqual(testArrayTwo, [1,1,1,1,1,1,1,1,1,1]);
    });

    it('tests to make sure that when pivot is a repeating element then it does not throw off algorithm', () => {
        quickSort3(testArrayThree);
        assert.deepEqual(testArrayThree, [1,1,2,2,4,5,8,10,10,10,10]);
    });

    it('quickly sorts a large array proving this is O(N*log(N))', () => {
        let arraySize = 7750;
        console.time();
        let testArrayFour = Array.apply(null, Array(arraySize)).map((element, index) => { return arraySize - index - 1; });
        let compareArray = Array.apply(null, Array(arraySize)).map((element, index) => { return index; });
        console.timeEnd();
        console.time();
        quickSort3(testArrayFour);
        console.timeEnd();
        console.time();
        assert.deepEqual(testArrayFour, compareArray);
        console.timeEnd();
    }).timeout(3000);

    it('sorts a small array accurately', () => {
        quickSort3(testArrayFive);
        assert.deepEqual(testArrayFive, [0,1,2]);
    });

    it('sorts array with large and small numbers accurately', () => {
        quickSort3(testArraySix);
        assert.deepEqual(testArraySix,[1,2,5,900000,1000000,1000001,600000000]);
    });

    it('quickly sorts a large array that has many repeating elements', () => {
        let arraySize = 7750;
        console.time();
        let testArraySeven = Array.apply(null, Array(arraySize)).map((element, index) => { if (index%2) return 0; else return 1; });
        let compareArray = Array.apply(null, Array(arraySize)).map((element, index) => { if (index < (7750 / 2)) return 0; else return 1; });
        console.timeEnd();
        console.time();
        quickSort3(testArraySeven);
        console.timeEnd();
        console.time();
        assert.deepEqual(testArraySeven, compareArray);
        console.timeEnd();
    }).timeout(3000);
});