const fs = require('fs');
const nodes = [5000,2500,7500];
const upperlimit = 10000;
let counter = 1;

function parent(index) {
    return Math.floor((index - 1) / 2);
};

while(nodes.length < 10000) {
    let parentNode = nodes[parent(counter)];
    let currNode = nodes[counter];
    // insert left child
    if (parentNode > currNode) nodes.push(Math.floor(currNode / 2));
    else nodes.push(Math.floor((currNode + parentNode) / 2));
    // insert right child
    if (parentNode > currNode) nodes.push(Math.floor((currNode + parentNode) / 2));
    else nodes.push(Math.floor((currNode + upperlimit) / 2));
    counter += 1;
};

fs.writeFile('../test/nodes.txt', nodes, {encoding:'utf8'}, (err) => {
    if (err) return console.error(err);
    else console.log('success');
});