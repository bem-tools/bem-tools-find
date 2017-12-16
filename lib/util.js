'use strict';

var Filter = require('./filter'),
    Criteria = require('./criteria/criteria'),
    CriteriaCollection = require('./criteria/criteria-collection');

/**
 * Makes conditions model from given options
 * @param {Object} options
 * @returns {Object}
 */
exports.conditionsFromOptions = function(options) {
    return {
        levels : options.level || [],
        blocks : options.block || [],
        elements : options.element || [],
        modifiers : options.modifier || [],
        techs : options.tech || []
    };
};

/**
 * Makes conditions model from parsed BEM items
 * @param {Array} items - array of BEM items parsed by bem-naming tool
 * @see https://npmjs.org/package/bem-naming
 * @returns {Array}
 */
exports.conditionsFromBEMItems = function(items) {
    items = items || [];

    function get(item, field) {
        return item[field]? [item[field]] : [];
    }

    return items.map(function(item) {
        return {
            levels : [],
            blocks : get(item, 'block'),
            elements : get(item, 'elem'),
            modifiers : get(item, 'modName'),
            techs : []
        };
    });
};

exports.getFiltersForConditions = function(conditions) {
    if(!Array.isArray(conditions))
        conditions = [conditions];


    var collection = new CriteriaCollection(conditions.map(function(criteria) {
            return new Criteria(criteria);
        })),
        filters = collection.getFilterCriteria().map(function(criteria) {
            return new Filter(criteria);
        }),
        apply = function(item) {
            return filters.some(function(filter) {
                return filter.apply(item);
            });
        };

    return { apply : apply };
};
