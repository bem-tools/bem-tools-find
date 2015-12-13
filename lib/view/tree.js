'use strict';
var prettyTree = require('pretty-tree'),
    stream = require('through2'),
    Tree = require('../tree');

module.exports = function() {
    var tree = new Tree('tree');
    return stream.obj(function(item, enc, callback) {
        if (item.elem && item.modName) {
            tree.addElemModeNode(item, true);
        }else if (item.elem) {
            tree.addElemNode(item, true);
        }else if (item.modName) {
            tree.addModeNode(item, true);
        }else {
            tree.addBlockNode(item, true);
        }
        callback();
    }, function(callback) {
        this.push(prettyTree(tree.getTree()));
        callback();
    });
};
