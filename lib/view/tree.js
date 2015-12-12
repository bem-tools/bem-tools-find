'use strict';
var streamMap = require('through2-map');

var TreeView = module.exports = function() {};

TreeView.prototype = {
    apply: function() {
        return streamMap.obj(function(item) {
            return item.path;
        });
    }
};

