'use strict';
var bemWalk = require('@bem/sdk.walk'),
    bemConfig = require('@bem/sdk.config'),
    streamFilter = require('through2-filter'),
    utils = require('./util');

module.exports = function(conditions) {
    var config = bemConfig();

    return bemWalk(
        config.getSync().levels.map(function(level) { return level.path; }),
        { levels : config.levelMapSync() })
            .pipe(streamFilter.obj(utils.getFiltersForConditions(conditions).apply));
};
