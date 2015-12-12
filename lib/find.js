'use strict';
var bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    Filter = require('./filter');

module.exports = function(options) {
    var filter = new Filter(options);
    return bemWalk(getLevels(), getSchema())
        .pipe(streamFilter.obj(filter.apply.bind(filter)));
};

function getLevels() {
    return require('../draft/levels'); //TODO hard code
}

function getSchema() {
    return require('../draft/schema'); //TODO hard code
}
