'use strict';
var _ = require('lodash');

var Tree = module.exports = function(title) {
    this._tree = { label : title, nodes : [] };
};

Tree.prototype = {
    /**
     * Find or create tree node
     * @param {Object} parent node
     * @param {Object} item - BEM entity item
     * @param {Function} template function for label creation
     * @param {Boolean} addLeaf needs to add leaf or not
     * @returns {Object} created node
     * @private
     */
    _findOrCreate : function(parent, item, template, addLeaf) {
        var node = _.find(parent.nodes, { label : template(item) });
        if(!node) {
            node = { label : template(item), nodes : [] };
            parent.nodes.push(node);
        }
        if(addLeaf) {
            node.leaf = node.leaf || {};
            node.leaf[item.tech] = item.path;
        }
        return node;
    },

    /**
     * Returns level label template function
     * @param {Object} item - BEM entity function
     * @returns {String}
     * @private
     */
    _getLevelLabel : function(item) {
        return item.level;
    },

    /**
     * Returns block label template function
     * @param {Object} item - BEM entity function
     * @returns {String}
     * @private
     */
    _getBlockLabel : function(item) {
        return item.block;
    },

    /**
     * Returns elem label template function
     * @param {Object} item - BEM entity function
     * @returns {String}
     * @private
     */
    _getElemLabel : function(item) {
        return '__' + item.elem;
    },

    /**
     * Returns modifier name label template function
     * @param {Object} item - BEM entity function
     * @returns {String}
     * @private
     */
    _getModNameLabel : function(item) {
        return '_' + item.modName;
    },

    /**
     * Returns modifier value label template function
     * @param {Object} item - BEM entity function
     * @returns {String}
     * @private
     */
    _getModValLabel : function(item) {
        return item.modVal;
    },

    /**
     * Adds level node into tree
     * @param {Object} item - BEM entity function
     * @returns {Object}
     * @private
     */
    _addLevelNode : function(item) {
        return this._findOrCreate(this._tree, item, this._getLevelLabel, false);
    },

    /**
     * Adds block node into tree
     * @param {Object} item - BEM entity function
     * @param {Boolean} addLeaf needs to add leaf or not
     * @returns {Object}
     */
    _addBlockNode : function(item, addLeaf) {
        var parent = this._addLevelNode(item);
        return this._findOrCreate(parent, item, this._getBlockLabel, addLeaf);
    },

    /**
     * Adds block mode node into tree
     * @param {Object} item - BEM entity function
     * @param {Boolean} addLeaf needs to add leaf or not
     * @returns {Object}
     */
    _addModeNode : function(item, addLeaf) {
        var parent = this._addBlockNode(item),
            modName = this._findOrCreate(parent, item, this._getModNameLabel, false);
        return this._findOrCreate(modName, item, this._getModValLabel, addLeaf);
    },

    /**
     * Adds block elem node into tree
     * @param {Object} item - BEM entity function
     * @param {Boolean} addLeaf needs to add leaf or not
     * @returns {Object}
     */
    _addElemNode : function(item, addLeaf) {
        var parent = this._addBlockNode(item);
        return this._findOrCreate(parent, item, this._getElemLabel, addLeaf);
    },

    /**
     * Adds block elem mode node into tree
     * @param {Object} item - BEM entity function
     * @param {Boolean} addLeaf needs to add leaf or not
     * @returns {*}
     */
    _addElemModeNode : function(item, addLeaf) {
        var parent = this._addElemNode(item),
            modName = this._findOrCreate(parent, item, this._getModNameLabel, false);
        return this._findOrCreate(modName, item, this._getModValLabel, addLeaf);
    },

    addNode : function(item) {
        if(item.elem && item.modName)
            return this._addElemModeNode(item, true);
        else if(item.elem)
            return this._addElemNode(item, true);
        else if(item.modName)
            return this._addModeNode(item, true);
        else if(item.block)
            return this._addBlockNode(item, true);
        else
            return this._addLevelNode(item);

    },

    /**
     * Returns tree model
     * @returns {Object}
     */
    getTree : function() {
        return this._tree;
    }
};
