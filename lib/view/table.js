'use strict';
var streamMap = require('through2-map');

var TableView = module.exports = function() {};

TableView.prototype = {
    apply: function() {
        return streamMap.obj(function(item) {
            return item.path;
        });
    }
};
