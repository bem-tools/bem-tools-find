'use strict';
var _ = require('lodash'),
    bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    stringify = require('JSONStream').stringify,
    Filter = require('./filter');

module.exports = function(options) {
    options = normalizeOptions(options);
    var stream = bemWalk(getLevels(), getSchema()).pipe(createStreamFilter(options));

    if (options.cli) {
        return createOutputView(stream);
    }
    return stream;
};

function normalizeOptions(options) {
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
        isTree: false,
        cli: false
    });
}

function createStreamFilter(options) {
    var filter = new Filter(options);
    return streamFilter.obj(filter.apply.bind(filter));
}

function createOutputView(stream) {
    return stream
        .pipe(stringify())
        .pipe(process.stdout);
}

function getLevels() {
    return require('../draft/levels'); //TODO hard code
}

function getSchema() {
    return require('../draft/schema'); //TODO hard code
}
