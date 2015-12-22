'use strict';

var _ = require('lodash'),
    bemConfig = require('bem-config'),
    Filter = require('./filter'),
    Criteria = require('./criteria/criteria'),
    CriteriaCollection = require('./criteria/criteria-collection');

exports.normalizeCliOptions = function(options) {
    options = options || {};

    ['block', 'element', 'modifier', 'tech'].forEach(function(key) {
        delete options[key];
    });

    return _.defaults(options, {
        view: 'plain',
        cli: false
    });
};

exports.criteriaFromOptions = function(options) {
    return {
        blocks: options.block || [],
        elements: options.element || [],
        modifiers: options.modifier || [],
        techs: options.tech || []
    };
};

exports.criteriasFromBEMItems = function(items) {
    items = items || [];

    return items.map(function(item) {
        return {
            blocks: item.block? [item.block] : [],
            elements: item.elem? [item.elem] : [],
            modifiers: item.modName? [item.modName] : [],
            techs: []
        };
    });
};

exports.initializeConfig = function() {
    var config = bemConfig().extended;

    function getLevels() {
        return config.levels || ['.'];
    }

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
        });

    return {apply: function(item) {
        return filters.some(function(filter) {
            return filter.apply(item);
        });
    }};
};
