'use strict';
var bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    Filter = require('./filter');

module.exports = function(options) {
    return bemWalk(getLevels(), getSchema()).pipe(createStreamFilter(options));
};

function createStreamFilter(options) {
    var filter = new Filter(options);
    return streamFilter.obj(filter.apply.bind(filter));
}

function getLevels() {
    return require('../draft/levels'); //TODO hard code
}

function getSchema() {
    return require('../draft/schema'); //TODO hard code
}
