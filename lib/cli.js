'use strict';

var _ = require('lodash'),
    util = require('./util'),
    find = require('./find'),
    getView = require('./view');

module.exports = require('coa').Cmd()
    .name(process.argv[1])
    .title('BEM Tool Find')
    .helpful()
    .completable()
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
        .short('v')
        .long('view')
        .val(function(value) {
            if (['plain', 'table', 'tree'].indexOf(value) === -1) {
                value = 'plain';
            }
            return value;
        })
        .def('plain')
    .end()
    .act(function(opts) {
        opts = util.normalizeCliOptions(opts);
        find(opts)
            .pipe(getView(opts.view).apply())
            .pipe(process.stdout);
    });
