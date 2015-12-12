'use strict';
var bemConfig = require('bem-config'),
    bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    Filter = require('./filter');

module.exports = function(options) {
    var filter = new Filter(options);
    var config = bemConfig();
    return bemWalk(config.extended.levels, require('../draft/schema'))
        .pipe(streamFilter.obj(filter.apply.bind(filter)));
};
