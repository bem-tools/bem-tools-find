'use strict';
var prettyTree = require('pretty-tree'),
    stream = require('through2'),
    Tree = require('./utils/tree');

module.exports = function() {
    var tree = new Tree('tree');

    function transform(item, encoding, cb) {
        tree.addNode(item);
        cb();
    }

    return stream.obj(transform.bind(stream), function flush(cb) {
        this.push(prettyTree(tree.getTree()));
        cb();
    });
};
