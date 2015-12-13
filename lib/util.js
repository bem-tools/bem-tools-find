'use strict';

var _ = require('lodash');

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

exports.getEntityColor = function(entity) {
    if (entity.elem && entity.modName) {
        return 'cyan';
    } else if (entity.elem) {
        return 'green';
    } else if (entity.modName) {
        return 'yellow';
    }
    return 'red';
};
