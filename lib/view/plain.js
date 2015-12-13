'use strict';
var EOL = require('os').EOL,
    streamMap = require('through2-map');

module.exports = function() {
    return streamMap.obj(function(item) {
        return item.path + EOL;
    });
};
