'use strict';

var inherit = require('inherit'),
    Node = require('./node'),
    Element = require('./element'),
    Modifier = require('./modifier');

var Block = inherit(Node, {
    __constructor: function(name, path, tech) {
        this.__base(name, path, tech);

        this._elements = [];
        this._modifiers = [];
    },

    appendIfNeeded: function(entity) {
        if (entity.elem) {
            this._append(entity, 'elem', this._elements, Element);
        } else if (!entity.elem && entity.modName) {
            this._append(entity, 'modName', this._modifiers, Modifier);
        }
    },

    compile: function() {
        throw new Error('Not implemented');
    }
});

module.exports = Block;
