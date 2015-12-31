'use strict';
var _ = require('lodash');

var Filter = module.exports = function(criteria) {
    this._criteria = criteria;
};

Filter.prototype = {
    /**
     * Applies all filter criteria to given items
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     */
    apply: function(item) {
        return [
            this._byLevel,
            this._byBlock,
            this._byElement,
            this._byModifier,
            this._byTech
        ].every(function(filterFunc) {
            return filterFunc.call(this, item);
        }.bind(this));
    },

    /**
     * Applies level criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byLevel: function(item) {
        return this._shouldPass(item, 'levels', 'level');
    },

    /**
     * Applies block criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byBlock: function(item) {
        return this._shouldPass(item, 'blocks', 'block');
    },

    /**
     * Applies element criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byElement: function(item) {
        return this._shouldPass(item, 'elements', 'elem');
    },

    /**
     * Applies modifier criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byModifier: function(item) {
        return this._shouldPass(item, 'modifiers', 'modName');
    },

    /**
     * Applies tech criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byTech: function(item) {
        return this._shouldPass(item, 'techs', 'tech');
    },

    /**
     * Determines should item pass or not
     * @param {Object} item - BEM entity object
     * @param {String} optsField - name of option field
     * @param {String} itemField - name of item field
     * @returns {Boolean}
     * @private
     */
    _shouldPass: function(item, optsField, itemField) {
        return _.isEmpty(this._criteria[optsField]) || _.includes(this._criteria[optsField], item[itemField]);
    }
};
