'use strict';
var _ = require('lodash');

var Filter = module.exports = function(opts) {
    this._opts = opts;
};

Filter.prototype = {
    apply: function(item) {
        return [
            this._byBlock,
            this._byElement,
            this._byModifier,
            this._byTech
        ].every(function(filterFunc) {
            return filterFunc.call(this, item);
        }.bind(this));
    },

    _byBlock: function(item) {
        return this._shouldPass(item, 'blocks', 'block');
    },

    _byElement: function(item) {
        return this._shouldPass(item, 'elements', 'elem');
    },

    _byModifier: function(item) {
        return this._shouldPass(item, 'modifiers', 'modName');
    },

    _byTech: function(item) {
        return this._shouldPass(item, 'techs', 'tech');
    },

    _shouldPass: function(item, optsField, itemField) {
        return _.isEmpty(this._opts[optsField]) || _.includes(this._opts[optsField], item[itemField]);
    }
};
