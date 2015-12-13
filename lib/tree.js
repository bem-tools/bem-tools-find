'use strict';
var _ = require('lodash');

var Tree = function(title) {
    this._tree = {label: title, nodes: []};
};

Tree.prototype = {
    _findOrCreate: function(parent, item, template, addLeaf) {
        var node = _.find(parent.nodes, {label: template(item)});
        if (!node) {
            node = {label: template(item), nodes: []};
            parent.nodes.push(node);
        }
        if (addLeaf) {
            node.leaf = node.leaf || {};
            node.leaf[item.tech] = item.path;
        }
        return node;
    },

    _getLevelLabel: function(item) {
        return item.level;
    },

    _getBlockLabel: function(item) {
        return item.block;
    },

    _getElemLabel: function(item) {
        return '__' + item.elem;
    },

    _getModNameLabel: function(item) {
        return '_' + item.modName;
    },

    _getModValLabel: function(item) {
        return item.modVal;
    },

    addLevelNode: function(item) {
        return this._findOrCreate(this._tree, item, this._getLevelLabel);
    },

    addBlockNode: function(item, addLeaf) {
        var parent = this.addLevelNode(item);
        return this._findOrCreate(parent, item, this._getBlockLabel, addLeaf);
    },

    addModeNode: function(item, addLeaf) {
        var parent = this.addBlockNode(item),
            modName = this._findOrCreate(parent, item, this._getModNameLabel);
        return this._findOrCreate(modName, item, this._getModValLabel, addLeaf);
    },

    addElemNode: function(item, addLeaf) {
        var parent = this.addBlockNode(item);
        return this._findOrCreate(parent, item, this._getElemLabel, addLeaf);
    },

    addElemModeNode: function(item, addLeaf) {
        var parent = this.addElemNode(item),
            modName = this._findOrCreate(parent, item, this._getModNameLabel);
        return this._findOrCreate(modName, item, this._getModValLabel, addLeaf);
    },

    getTree: function() {
        return this._tree;
    }
};

module.exports = Tree;
