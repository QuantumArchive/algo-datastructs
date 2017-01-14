const chai = require('chai');
const assert = chai.assert;
const bstree = require('../lib/binary-search-tree')();

describe('testing out binary search tree properties', () => {

    let firstNodes = [4,2,6,5,7,1,3];
    let firstBFS = [4,2,6,1,3,5,7];
    let firstDFS = [1,2,3,4,5,6,7];
    const firstTree = new bstree();

    it('inserts all nodes into tree without problem', () => {
        firstNodes.forEach((element) => {
            firstTree.insert(element);
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
});