'use strict';

var _ = require('lodash'),
    bemNaming = require('bem-naming'),
    util = require('./lib/util'),
    find = require('./lib/find'),
    getView = require('./lib/view');

/**
 * Executes find process with given cli options and arguments
 * @param {Object} opts - cli options
 * @param {Object} args - cli arguments
 */
function execute(opts, args) {
    var conditions = util.conditionsFromBEMItems(args.entity);
    conditions.push(util.conditionsFromOptions(opts));

    find(conditions)
        .pipe(getView(opts.view)())
        .pipe(process.stdout);
}

module.exports = function() {
    return this
        .title('BEM Tool Find')
        .helpful()
        .completable()
        .arg()
            .name('entity')
            .title('entity')
            .val(function(value) {
                if (bemNaming.validate(value)) {
                    return bemNaming.parse(value);
                } else {
                    return this.reject('Passed argument is not valid BEM entity');
                }
            })
            .arr()
        .end()
        .opt()
            .name('block')
            .title('Name of block(s)')
            .short('b')
            .long('block')
            .arr()
        .end()
        .opt()
            .name('element')
            .title('Name of element(s)')
            .short('e')
            .long('element')
            .arr()
        .end()
        .opt()
            .name('modifier')
            .title('Name of modifier(s)')
            .short('m')
            .long('mod')
            .arr()
        .end()
        .opt()
            .name('tech')
            .title('Name of tech(s)')
            .short('t')
            .long('tech')
            .arr()
        .end()
        .opt()
            .name('view')
            .title('Type of output')
            .short('v')
            .long('view')
            .val(function(value) {
                if (!_.includes(['plain', 'table', 'tree'], value)) {
                    value = 'plain';
                }
                return value;
            })
            .def('plain')
        .end()
        .act(execute);
};
