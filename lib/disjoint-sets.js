module.exports = class disjointSets {
    constructor(parent = []) {
        // assuming no joins have been initiated on initial
        this.parent = parent;
        this.rank = [];
        this.parent.forEach(element => {
            this.rank.push(0);
        });
    }
    makeSet(index) {
        this.parent[index] = index;
        this.rank[index] = 0;
    }
    find(index) {
        while (index !== this.parent[index]) {
            index = this.parent[index];
        };
        return index;
    }
    findPathCompressIterative(index) {
        if (index !== this.parent[index]) {

            let parent = this.parent[index];
            let child = index;

            while (child !== parent) {
                child = parent;
                parent = this.parent[parent];
            };

            this.parent[index] = parent;
        };
        return this.parent[index];
    }
    findPathCompressRecursive(index) {
        if (index !== this.parent[index]) {
            this.parent[index] = this.findPathCompressRecursive(this.parent[index]);
        };
        return this.parent[index];
    }
    union(i, j) {
        let i_id = this.find(i);
        let j_id = this.find(j);
        if (i_id === j_id) return;
        if (this.rank[i_id] > this.rank[j_id]) {
            this.parent[j_id] = i_id;
        } else {
            this.parent[i_id] = j_id;
            if (this.rank[i_id] === this.rank[j_id]) {
                this.rank[j_id] += 1;
            };
        };
    }
    unionIter(i, j) {
        let i_id = this.findPathCompressIterative(i);
        let j_id = this.findPathCompressIterative(j);
        if (i_id === j_id) return;
        if (this.rank[i_id] > this.rank[j_id]) {
            this.parent[j_id] = i_id;
        } else {
            this.parent[i_id] = j_id;
            if (this.rank[i_id] === this.rank[j_id]) {
                this.rank[j_id] += 1;
            };
        };
    }
    unionRecur(i, j) {
        let i_id = this.findPathCompressRecursive(i);
        let j_id = this.findPathCompressRecursive(j);
        if (i_id === j_id) return;
        if (this.rank[i_id] > this.rank[j_id]) {
            this.parent[j_id] = i_id;
        } else {
            this.parent[i_id] = j_id;
            if (this.rank[i_id] === this.rank[j_id]) {
                this.rank[j_id] += 1;
            };
        };
    }
};