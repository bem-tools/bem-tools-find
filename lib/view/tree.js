'use strict';
var path = require('path'),
    _ = require('lodash'),
    prettyTree = require('pretty-tree'),
    stream = require('through2'),
    Tree = require('../tree/tree');

module.exports = function() {
    //var tree = {label: 'tree', nodes: []};
    var tree = new Tree('tree');

    return stream.obj(function(item, enc, callback) {
        //if (item.elem && item.modName) {
        //    addElemModeNode(tree, item);
        //}else if (item.elem) {
        //    addElemNode(tree, item);
        //}else if (item.modName) {
        //    addModeNode(tree, item);
        //}else {
        //    addBlockNode(tree, item);
        //}
        tree.appendIfNeeded(item);
        callback();
    }, function(callback) {
        this.push(prettyTree(tree));
        callback();
    });
};

function addLevelNode(tree, item) {
    var levelNode = _.find(tree.nodes, {label: item.level});
    if (!levelNode) {
        levelNode = {label: item.level, nodes: []};
        tree.nodes.push(levelNode);
    }
    return levelNode;
}

function addBlockNode(tree, item) {
    var levelNode = addLevelNode(tree, item);
    var blockNode = _.find(levelNode.nodes, {label: item.block});
    if (!blockNode) {
        blockNode = {label: item.block, nodes: [], leaf: {}};
        levelNode.nodes.push(blockNode);
    }
    blockNode.leaf[item.tech] = item.path;
    return blockNode;
}

function addModeNode(tree, item) {
    var blockNode = addBlockNode(tree, item);
    var modNameNode = _.find(blockNode.nodes, {label: item.modName});
    if (!modNameNode) {
        modNameNode = {label: item.modName, nodes: []};
        blockNode.nodes.push(modNameNode);
    }
    var modValNode = _.find(modNameNode.nodes, {label: item.modVal});
    if (!modValNode) {
        modValNode = {label: item.modVal, leaf: {}};
        modNameNode.nodes.push(modValNode);
    }
    modValNode.leaf[item.tech] = item.path;
    return modValNode;
}

function addElemNode(tree, item) {
    var blockNode = addBlockNode(tree, item);
    var elemNode = _.find(blockNode.nodes, {label: item.elem});
    if (!elemNode) {
        elemNode = {label: item.elem, nodes: [], leaf: {}};
        blockNode.nodes.push(elemNode);
    }
    elemNode.leaf[item.tech] = item.path;
    return elemNode;
}

function addElemModeNode(tree, item) {
    var elemModNode = addElemNode(tree, item);
    var modNameNode = _.find(elemModNode.nodes, {label: item.modName});
    if (!modNameNode) {
        modNameNode = {label: item.modName, nodes: []};
        elemModNode.nodes.push(modNameNode);
    }
    var modValNode = _.find(modNameNode.nodes, {label: item.modVal});
    if (!modValNode) {
        modValNode = {label: item.modVal, leaf: {}};
        modNameNode.nodes.push(modValNode);
    }
    modValNode.leaf[item.tech] = item.path;
    return modValNode;
}
