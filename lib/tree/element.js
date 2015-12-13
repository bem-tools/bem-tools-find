'use strict';

var inherit = require('inherit'),
    Node = require('./node'),
    Modifier = require('./modifier');

var Element = inherit(Node, {
    __constructor: function(name, path, tech) {
        this.__base(name, path, tech);

        this._elements = [];
    },

    appendIfNeeded: function(entity) {
        if (entity.modName) {
            this._append(entity, 'modName', this._elements, Modifier);
        }
    },

    compile: function() {
        throw new Error('Not implemented');
    }
});

module.exports = Element;
