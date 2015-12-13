'use strict';
var Table = require('easy-table'),
    stream = require('through2'),
    chalk = require('chalk'),
    util = require('../util');

module.exports = function() {
    var table = new Table();

    function createTableCell(item, field, header) {
        table.cell(header, item[field] && chalk[util.getEntityColor(item)](item[field]));
    }

    return stream.obj(function(item, enc, callback) {
        createTableCell(item, 'block', 'Block');
        createTableCell(item, 'elem', 'Element');
        createTableCell(item, 'modName', 'Mod Name');
        createTableCell(item, 'modVal', 'Mod Value');
        createTableCell(item, 'tech', 'Tech');
        createTableCell(item, 'path', 'File Path');
        table.newRow();
        callback();
    }, function(callback) {
        this.push(table.toString());
        callback();
    });
};
