'use strict';
var table = require('table'),
    stream = require('through2'),
    tableUtil = require('./utils/table');

module.exports = function() {
    var tableData = [tableUtil.getTableHeader()];

    return stream.obj(function(item, enc, cb) {
        tableData.push(tableUtil.getTableRow(item));
        cb();
    }, function(cb) {
        this.push(table.default(tableData, tableUtil.getTableOptions()));
        cb();
    });
};
