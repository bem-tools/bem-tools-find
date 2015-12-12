'use strict';
var PlainView = require('./plain'),
    TableView = require('./table'),
    TreeView = require('./tree');

module.exports = function(view) {
    return {
        'plain': new PlainView(),
        'table': new TableView(),
        'tree': new TreeView()
    }[view];
};
