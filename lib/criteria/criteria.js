'use strict';

var _ = require('lodash');

var Criteria = module.exports = function(conditions) {
    conditions = conditions || {};

    this._fields.forEach(function(field) {
        this[field] = conditions[field] || [];
    }, this);
};

Criteria.prototype = {
    _fields : ['levels', 'blocks', 'elements', 'modifiers', 'techs'],

    /**
     * Checks if criteria is empty or not
     * @returns {boolean}
     */
    isEmpty : function() {
        return this._fields.every(function(key) {
            return _.isEmpty(this[key]);
        }.bind(this));
    },

    /**
     * Compares criteria to another
     * @param {Criteria} another criteria entity
     * @returns {boolean}
     */
    isEqual : function(another) {
        if(!(another instanceof Criteria))
            return false;


        return this._fields.every(function(key) {
            return _.isEqual(this[key], another[key]);
        }.bind(this));
    }
};
