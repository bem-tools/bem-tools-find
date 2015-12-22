'use strict';
var _ = require('lodash'),
    tableUtil = require('../../../../lib/view/utils/table');

describe('table', function() {
    var blockEntity = {
            level: 'some-level',
            block: 'some-block',
            tech: 'some-tech',
            path: 'some-path'
        },
        blockModEntity = _.extend({}, blockEntity, {
            modName: 'some-mod-name',
            modVal: 'some-mod-val'
        }),
        blockElemEntity = _.extend({}, blockEntity, {
            elem: 'some-elem'
        }),
        blockElemModEntity = _.extend({}, blockEntity, blockElemEntity, blockModEntity);

    it('should return valid table column headers', function() {
        assert.deepEqual(tableUtil.getTableHeader(),
            [
                '\u001b[1m' + 'Block' + '\u001b[22m',
                '\u001b[1m' + 'Element' + '\u001b[22m',
                '\u001b[1m' + 'Mod Name' + '\u001b[22m',
                '\u001b[1m' + 'Mod Value' + '\u001b[22m',
                '\u001b[1m' + 'Tech' + '\u001b[22m',
                '\u001b[1m' + 'File Path' + '\u001b[22m'
            ]);
    });

    it('should return valid table row data for block entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockEntity), [
            '\u001b[33m' + 'some-block' + '\u001b[39m',
            '',
            '',
            '',
            '\u001b[33m' + 'some-tech' + '\u001b[39m',
            '\u001b[33m' + 'some-path' + '\u001b[39m'
        ]);
    });

    it('should return valid table row data for block mod entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockModEntity), [
            '\u001b[32m' + 'some-block' + '\u001b[39m',
            '',
            '\u001b[32m' + 'some-mod-name' + '\u001b[39m',
            '\u001b[32m' + 'some-mod-val' + '\u001b[39m',
            '\u001b[32m' + 'some-tech' + '\u001b[39m',
            '\u001b[32m' + 'some-path' + '\u001b[39m'
        ]);
    });

    it('should return valid table row data for block element entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockElemEntity), [
            '\u001b[36m' + 'some-block' + '\u001b[39m',
            '\u001b[36m' + 'some-elem' + '\u001b[39m',
            '',
            '',
            '\u001b[36m' + 'some-tech' + '\u001b[39m',
            '\u001b[36m' + 'some-path' + '\u001b[39m'
        ]);
    });

    it('should return table row data for block element mod entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockElemModEntity), [
            '\u001b[35m' + 'some-block' + '\u001b[39m',
            '\u001b[35m' + 'some-elem' + '\u001b[39m',
            '\u001b[35m' + 'some-mod-name' + '\u001b[39m',
            '\u001b[35m' + 'some-mod-val' + '\u001b[39m',
            '\u001b[35m' + 'some-tech' + '\u001b[39m',
            '\u001b[35m' + 'some-path' + '\u001b[39m'
        ]);
    });

    it('should return valid table options', function() {
        assert.deepEqual(tableUtil.getTableOptions(), {
            columns: {
                0: {width: 10},
                1: {width: 10},
                2: {width: 10},
                3: {width: 20},
                4: {width: 20},
                5: {width: 50}
            }
        });
    });
});
