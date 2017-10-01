'use strict';
var EOL = require('os').EOL,

    table = require('table'),
    prettyTree = require('pretty-tree'),
    stream = require('through2'),
    streamMap = require('through2-map'),

    tableUtil = require('./utils/table'),
    Tree = require('./utils/tree');

module.exports = function(view) {
    return {
        'plain' : createPlainView,
        'table' : createTableView,
        'tree' : createTreeView
    }[view];
};

/**
 * Creates plain view presentation of results
 * @returns {Stream}
 */
function createPlainView() {
    return streamMap.obj(function(item) {
        return item.path + EOL;
    });
}

/**
 * Creates table view presentation of results
 * @returns {Stream}
 */
function createTableView() {
    var tableData = [tableUtil.getTableHeader()];

    return stream.obj(function(item, enc, cb) {
        tableData.push(tableUtil.getTableRow(item));
        cb();
    }, function(cb) {
        this.push(table.default(tableData, tableUtil.getTableOptions()));
        cb();
    });
}

/**
 * Creates tree view presentation of results
 * @returns {Stream}
 */
function createTreeView() {
    var tree = new Tree('tree');

    function transform(item, encoding, cb) {
        tree.addNode(item);
        cb();
    }

    return stream.obj(transform.bind(stream), function flush(cb) {
        this.push(prettyTree(tree.getTree()));
        cb();
    });
}
