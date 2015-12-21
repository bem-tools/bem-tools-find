'use strict';
var _ = require('lodash'),
    table = require('table'),
    stream = require('through2'),
    chalk = require('chalk');

var COLUMNS = [
    {title: 'Block', field: 'block', width: 10},
    {title: 'Element', field: 'elem', width: 10},
    {title: 'Mod Name', field: 'modName', width: 10},
    {title: 'Mod Value', field: 'modVal', width: 20},
    {title: 'Tech', field: 'tech', width: 20},
    {title: 'File Path', field: 'path', width: 50}
];

module.exports = function() {
    var tableData = [getTableHeader()];

    return stream.obj(function(item, enc, callback) {
        tableData.push(getTableRow(item));
        callback();
    }, function(callback) {
        this.push(table.default(tableData, getTableOptions()));
        callback();
    });
};

function getTableHeader() {
    return _.pluck(COLUMNS, 'title').reduce(function(prev, item) {
        prev.push(chalk.bold(item));
        return prev;
    }, []);
}

function getTableRow(entity) {
    return _.pluck(COLUMNS, 'field').reduce(function(prev, field) {
        prev.push(chalk[getRowTextColor(entity)](entity[field] || ''));
        return prev;
    }, []);
}

function getRowTextColor(entity) {
    if (entity.elem && entity.modName) {
        return 'magenta';
    } else if (entity.elem) {
        return 'cyan';
    } else if (entity.modName) {
        return 'green';
    }
    return 'yellow';
}

function getTableOptions() {
    return {
        columns: COLUMNS.reduce(function(prev, item, index) {
            prev[index] = _.pick(item, 'width');
            return prev;
        }, {})
    };
}
