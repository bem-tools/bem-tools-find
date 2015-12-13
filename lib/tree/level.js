'use strict';

var inherit = require('inherit'),
    Node = require('./node'),
    Block = require('./block');

var Level = inherit(Node, {
    __constructor: function(name, path, tech) {
        this.__base(name, path, tech);

        this._blocks = [];
    },

    appendIfNeeded: function(entity) {
        this._append(entity, 'block', this._blocks, Block);
    },

    compile: function() {
        throw new Error('Unimplemented');
    }
});

module.exports = Level;
