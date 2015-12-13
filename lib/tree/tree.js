'use strict';

var _ = require('lodash'),
    inherit = require('inherit'),
    Node = require('./node'),
    Level = require('./level');

var Tree = inherit(Node, {
    __constructor: function(title) {
        this._title = title;
        this._levels = [];
    },

    appendIfNeeded: function(item) {
        this._append(item, 'level', this._levels, Level);
    },

    compile: function() {
        return {
            label: this._title,
            nodes: this._levels.map(function(level) {return level.compile()})
        };
    }
});

module.exports = Tree;
