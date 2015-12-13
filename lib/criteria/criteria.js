'use strict';

var _ = require('lodash');

var Criteria = function(conditions) {
    conditions = conditions || {};

    this.blocks = conditions.blocks || [];
    this.elements = conditions.elements || [];
    this.modifiers = conditions.modifiers || [];
    this.techs = conditions.techs || [];
};

Criteria.prototype = {
    _fields: ['blocks', 'elements', 'modifiers', 'techs'],

    isEmpty: function() {
        return this._fields.every(function(key) {
            return _.isEmpty(this[key]);
        }.bind(this));
    },

    isEqual: function(another) {
        if (!(another instanceof Criteria)) {
            return false;
        }

        return this._fields.every(function(key) {
            return _.isEqual(this[key], another[key]);
        }.bind(this));
    }
};

Criteria.prototype.constructor = Criteria;

module.exports = Criteria;
