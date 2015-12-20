'use strict';
var prettyTree = require('pretty-tree'),
    stream = require('through2'),
    Tree = require('../tree');

module.exports = function() {
    var tree = new Tree('tree');

    function transform(item, encoding, cb) {
        tree.addNode(item);
        cb();
    }

    function flush(cb) {
        this.push(prettyTree(tree.getTree()));
        cb();
    }

    return stream.obj(transform.bind(stream), flush.bind(stream));
};
