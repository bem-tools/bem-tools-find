'use strict';
var _ = require('lodash'),
    chalk = require('chalk');

var COLUMNS = [
    { title : 'Block', field : 'block', width : 10 },
    { title : 'Element', field : 'elem', width : 10 },
    { title : 'Mod Name', field : 'modName', width : 10 },
    { title : 'Mod Value', field : 'modVal', width : 20 },
    { title : 'Tech', field : 'tech', width : 20 },
    { title : 'File Path', field : 'path', width : 50 }
];

/**
 * Returns color for table row data
 * @param {Object} entity - bem walk entity object
 * @returns {String}
 */
function getRowTextColor(entity) {
    if(entity.elem && entity.modName)
        return 'magenta';
    else if(entity.elem)
        return 'cyan';
    else if(entity.modName)
        return 'green';

    return 'yellow';
}

/**
 * Returns array of table column headers
 * @returns {String[]}
 */
exports.getTableHeader = function() {
    return _.pluck(COLUMNS, 'title').reduce(function(prev, item) {
        prev.push(chalk.bold(item));
        return prev;
    }, []);
};

/**
 * Returns data for single table row
 * @param {Object} entity - bem walk entity object
 * @returns {String[]}
 */
exports.getTableRow = function(entity) {
    return _.pluck(COLUMNS, 'field').reduce(function(prev, field) {
        prev.push(chalk[getRowTextColor(entity)](entity[field] || ''));
        return prev;
    }, []);
};

/**
 * Returns table options object
 * @see https://www.npmjs.com/package/table
 * @returns {Object}
 */
exports.getTableOptions = function() {
    return {
        columns : COLUMNS.reduce(function(prev, item, index) {
            prev[index] = _.pick(item, 'width');
            return prev;
        }, {})
    };
};
