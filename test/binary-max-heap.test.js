const chai = require('chai');
const assert = chai.assert;
const bmaxheap = require('../lib/binary-max-heap');

describe('testing out binary max heap properties', () => {
    let testArrayOne = [5,4,3,2,1];
    let testArrayTwo = [1,2,3,4,5];
    let testArrayThree = [1,6,4,8,2,7,3,10,9,5];

    it('returns same array if array values are inserted in order from greatest to least', () => {
        let testHeap = new bmaxheap();
        testArrayOne.forEach(element => {
            testHeap.insert(element);
        });
        assert.deepEqual(testArrayOne,testHeap.heapStruct);    
    });

    it('returns heap structure with highest value at the top', () => {
        let testHeap = new bmaxheap();
        testArrayTwo.forEach(element => {
            testHeap.insert(element);
        });
        assert.deepEqual([5,4,2,1,3], testHeap.heapStruct);
    });

    it('tests whether you can use a bmaxheap to sort out an array', () => {
        let testHeap = new bmaxheap();
        let newArray = Array.apply(null, Array(10));
        for(let i = 0; i < testArrayThree.length; i++) {
            testHeap.insert(testArrayThree[i]);
        };
        for(let k = 0; k < newArray.length; k++) {
            newArray[k] = testHeap.extractMax();
        };
        console.log(newArray);
        assert.deepEqual([10,9,8,7,6,5,4,3,2,1], newArray);
    });
});