const chai = require('chai');
const assert = chai.assert;
const mergeSort = require('../mergesort')();
const randomNumber = require('../random');

describe('tests out mergesort algorithm', () => {
    it('makes sure to return a 0 if given an array with [0]', () => {
        assert.deepEqual(mergeSort([0]), [0]);
    });

    it('makes sure to return a sorted array with a small input', () => {
        let testArrayOne = [3,2,1];
        assert.deepEqual(mergeSort(testArrayOne), [1,2,3]);
    });

    it('makes sure to return the same array if all elements are the same', () => {
        let testArrayTwo = [3,3,3,3,3,3];
        assert.deepEqual(mergeSort(testArrayTwo), testArrayTwo);
    });

    describe('makes sure to sort a large input in reasonable time', () => {
        let testArrayThree = [];
        let testArrayFour = [];
        let max = 4, min = 0;
        for(let i = 10000; 0 < i; i--) {
            testArrayThree.push(i);
            testArrayFour.push(randomNumber(min, max));
        };

        it('checks that the algorithm does not timeout', () => {
            console.time();
            let newArray = mergeSort(testArrayThree);
            console.timeEnd();
            assert.equal(newArray[0], 1);
            assert.equal(newArray[9999], 10000);
        })
        .timeout(6000);

        it('checks that the algorithm does not timeout', () => {
            console.time();
            let newArrayTwo = mergeSort(testArrayFour);
            console.timeEnd();
            assert.equal(newArrayTwo[0], 0);
            assert.equal(newArrayTwo[9999], 4);
        })
        .timeout(6000);
    });
});