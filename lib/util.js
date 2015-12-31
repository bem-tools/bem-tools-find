'use strict';

var Filter = require('./filter'),
    Criteria = require('./criteria/criteria'),
    CriteriaCollection = require('./criteria/criteria-collection');

/**
 * Makes conditions model from given options
 * @param options
 * @returns {Object}
 */
exports.conditionsFromOptions = function(options) {
    return {
        levels: options.level || [],
        blocks: options.block || [],
        elements: options.element || [],
        modifiers: options.modifier || [],
        techs: options.tech || []
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
            levels: [],
            blocks: get(item, 'block'),
            elements: get(item, 'elem'),
            modifiers: get(item, 'modName'),
            techs: []
        };
    });
};

/**
 * Initialize config from given bem-config with all necessary fall-backs
 * @param {Object} config - received by bem-config tool
 * @returns {Object}
 */
exports.initializeConfig = function(config) {
    config = config.extended;

    /**
     * Returns list of levels
     * @returns {String[]}
     */
    function getLevels() {
        return config.levels || ['.'];
    }

    /**
     * Return schema object for levels
     * @returns {{levels: *}}
     */
    function getSchema() {
        return {
            levels: getLevels().reduce(function(prev, level) {
                config.levelOpts = config.levelOpts || {};
                config.levelOpts[level] = config.levelOpts[level] || {};
                config.levelOpts[level].scheme = config.levelOpts[level].scheme || 'nested';
                prev[level] = {scheme: config.levelOpts[level].scheme};
                return prev;
            }, {})
        };
    }

    return {
        getConfig: config,
        getLevels: getLevels,
        getSchema: getSchema
    };
};

exports.getFiltersForConditions = function(conditions) {
    if (!Array.isArray(conditions)) {
        conditions = [conditions];
    }

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

    return {apply: apply};
};
