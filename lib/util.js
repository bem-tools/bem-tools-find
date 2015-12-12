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
