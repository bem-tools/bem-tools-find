'use strict';

var inherit = require('inherit'),
    Node = require('./node');

var Modifier = inherit(Node, {
    appendIfNeeded: function(entity) {},

    compile: function() {
        throw new Error('Not implemented');
    }
});

module.exports = Modifier;
