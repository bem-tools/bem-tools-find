'use strict';

var inherit = require('inherit');

var Node = inherit({
    __constructor: function(name, path, tech) {
        this.name = name;
        this.path = path;
        this.tech = tech;
    },

    appendIfNeeded: function(entity) {
        throw new Error('Not implemented');
    },

    compile: function() {
        throw new Error('Not implemented');
    },

    _find: function(what, where) {
        for (var i = 0; i < where.length; i++) {
            if (where[i].name === what) {
                return where[i];
            }
        }
        return null;
    },

    _append: function(item, bem, collection, Constructor) {
        var existing = this._find(entity[bem], collection);

        if (!existing) {
            existing = new Constructor(item[bem], item.path, item.name);
            collection.push(existing);
        }

        existing.appendIfNeeded(item);
    }
});

module.exports = Node;
