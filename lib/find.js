'use strict';
var bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    utils = require('./util');

module.exports = function(conditions) {
    var filters = utils.getFiltersForConditions(conditions),
        config = utils.initializeConfig();

    return bemWalk(config.getLevels(), config.getSchema()).pipe(streamFilter.obj(filters.apply));
};
