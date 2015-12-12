'use strict';

var bemNaming = require('bem-naming'),
    util = require('./util'),
    find = require('./find'),
    getView = require('./view');

function execute(opts, args) {
    opts = util.normalizeCliOptions(opts);
    util.appendEntities(opts, args.entity);

    find(opts)
        .pipe(getView(opts.view).apply())
        .pipe(process.stdout);
}

module.exports = require('coa').Cmd()
    .name(process.argv[1])
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
    .act(execute);
