const chai = require('chai');
const assert = chai.assert;
const bstree = require('../learner-implementation/binary-search-tree-learner')();

describe('testing out binary search tree properties', () => {

    let firstNodes = [4,2,6,5,7,1,3];
    let firstBFS = [4,2,6,1,3,5,7];
    let firstDFS = [1,2,3,4,5,6,7];
    let firstRangeSearch = [3,4,5];
    const firstTree = new bstree();
    let secondBFS = [4,2,6,1,3,7];
    let secondDFS = [1,2,3,4,6,7];
    let thirdBFS = [4,2,6,1,3,6,7];
    let thirdDFS = [1,2,3,4,6,6,7];

    it('inserts all nodes into tree without problem', () => {
        firstNodes.forEach((element) => {
            assert.notEqual(firstTree.insert(element), -1);
        });
    });

    it('makes sure breadth first search shows proper order', () => {
        let nodes = firstTree.breadthFirst();
        nodes.forEach((element, index) => {
            assert.equal(element.value, firstBFS[index]);
        });
    });

    it('makes sure depth first search shows proper order', () => {
        let nodes = firstTree.depthFirst();
        nodes.forEach((element, index) => {
            assert.equal(element.value, firstDFS[index]);
        });
    });

    it('makes sure range search shows all nodes with values between 3 and 5', () => {
        let nodes = firstTree.rangeSearch(3,5);
        nodes.forEach((element, index) => {
            assert.equal(element.value, firstRangeSearch[index]);
        });
    });

    it('finds a given node', () => {
        let nodeOne = firstTree.find(1);
        let nodeTwo = firstTree.find(7);
        let nodeThree = firstTree.find(4);
        assert.equal(nodeOne.value, 1);
        assert.equal(nodeTwo.value, 7);
        assert.equal(nodeThree.value, 4);
    });

    it('deletes a node', () => {
        firstTree.delete(5);
        let nodesBFS = firstTree.breadthFirst();
        nodesBFS.forEach((element, index) => {
            assert.equal(element.value, secondBFS[index]);
        });
        let nodesDFS = firstTree.depthFirst();
        nodesDFS.forEach((element, index) => {
            assert.equal(element.value, secondDFS[index]);
        });
    });

    it('inserts a node', () => {
        firstTree.insert(6);
        let nodesBFS = firstTree.breadthFirst();
        nodesBFS.forEach((element, index) => {
            assert.equal(element.value, thirdBFS[index]);
        });
        let nodesDFS = firstTree.depthFirst();
        nodesDFS.forEach((element, index) => {
            assert.equal(element.value, thirdDFS[index]);
        });
    });
});