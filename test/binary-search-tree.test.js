const chai = require('chai');
const assert = chai.assert;
const bstree = require('../lib/binary-search-tree');

describe('testing out binary search tree properties', () => {

    it('should get in the bstree', () => {
        assert.isOk(bstree());
    });
});