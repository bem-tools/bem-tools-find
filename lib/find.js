'use strict';
var bemWalk = require('@bem/sdk.walk'),
    bemConfig = require('@bem/sdk.config'),
    streamFilter = require('through2-filter'),
    utils = require('./util');

module.exports = function(conditions) {
    var filters = utils.getFiltersForConditions(conditions),
        config = utils.initializeConfig(bemConfig());

    return bemWalk(config.getLevels(), config.getSchema()).pipe(streamFilter.obj(filters.apply));
};
