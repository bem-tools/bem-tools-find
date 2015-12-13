'use strict';
var path = require('path'),
    _ = require('lodash'),
    prettyTree = require('pretty-tree'),
    stream = require('through2');

module.exports = function() {
    var tree = {label: 'tree', nodes: []};
    return stream.obj(function(item, enc, callback) {
        if (item.elem && item.modName) {
            addElemModeNode(tree, item, true);
        }else if (item.elem) {
            addElemNode(tree, item, true);
        }else if (item.modName) {
            addModeNode(tree, item, true);
        }else {
            addBlockNode(tree, item, true);
        }
        callback();
    }, function(callback) {
        this.push(prettyTree(tree));
        callback();
    });
};

function _findOrCreate(parent, item, field, addLeaf) {
    var node = _.find(parent.nodes, {label: item[field]});
    if (!node) {
        node = {label: item[field], nodes: []};
        parent.nodes.push(node);
    }
    if (addLeaf) {
        node.leaf = node.leaf || {};
        node.leaf[item.tech] = item.path;
    }
    return node;
}

function addLevelNode(tree, item) {
    return _findOrCreate(tree, item, 'level', false);
}

function addBlockNode(tree, item, addLeaf) {
    var parent = addLevelNode(tree, item);
    return _findOrCreate(parent, item, 'block', addLeaf);
}

function addModeNode(tree, item, addLeaf) {
    var parent = addBlockNode(tree, item);
    return _findOrCreate(
        _findOrCreate(parent, item, 'modName'), item, 'modVal', addLeaf);
}

function addElemNode(tree, item, addLeaf) {
    var parent = addBlockNode(tree, item);
    return _findOrCreate(parent, item, 'elem', addLeaf);
}

function addElemModeNode(tree, item, addLeaf) {
    var parent = addElemNode(tree, item);
    return _findOrCreate(
        _findOrCreate(parent, item, 'modName'), item, 'modVal', addLeaf);
}
