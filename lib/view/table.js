'use strict';
var Table = require('easy-table'),
    stream = require('through2');

var TableView = module.exports = function() {};

TableView.prototype = {
    apply: function() {
        var table = new Table();
        return stream.obj(function(item, enc, callback) {
            table.cell('Block', item.block);
            table.cell('Element', item.elem);
            table.cell('Mod Name', item.modName);
            table.cell('Mod Value', item.modVal);
            table.cell('Tech', item.tech);
            table.cell('Path', item.path);
            table.newRow();
            callback();
        }, function(callback) {
            this.push(table.toString());
            callback();
        });
    }
};
