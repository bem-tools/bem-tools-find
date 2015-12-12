'use strict';
var EOL = require('os').EOL,
    streamMap = require('through2-map');

var PlainView = module.exports = function() {};

PlainView.prototype = {
    apply: function() {
        return streamMap.obj(function(item) {
            return item.path + EOL;
        });
    }
};
