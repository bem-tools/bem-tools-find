'use strict';
var Table = require('easy-table'),
    stream = require('through2'),
    chalk = require('chalk'),
    util = require('../util');

module.exports = function() {
    var table = new Table();
    return stream.obj(function(item, enc, callback) {
        var color = util.getEntityColor(item);
        table.cell('Block', chalk[color](item.block));
        table.cell('Element', chalk[color](item.elem));
        table.cell('Mod Name', chalk[color](item.modName));
        table.cell('Mod Value', chalk[color](item.modVal));
        table.cell('Tech', chalk[color](item.tech));
        table.cell('Path', chalk[color](item.path));
        table.newRow();
        callback();
    }, function(callback) {
        this.push(table.toString());
        callback();
    });
};
