'use strict';

var _ = require('lodash');

exports.normalizeCliOptions = function(options) {
    options = options || {};

    ['block', 'element', 'modifier', 'tech'].forEach(function(key) {
        options[key + 's'] = options[key];
        delete options[key];
    });

    return _.defaults(options, {
        blocks: [],
        elements: [],
        modifiers: [],
        techs: [],
        view: 'plain',
        cli: false
    });
};

exports.appendEntities = function(opts, entities) {
    var map = {
        block: 'blocks',
        elem: 'elements',
        modName: 'modifiers'
    };

    entities.forEach(function(entity) {
        ['block', 'elem', 'modName'].forEach(function(key) {
            return _.has(entity, key) && opts[map[key]].push(entity[key]);
        });
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
