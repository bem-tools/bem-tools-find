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
            ['Block', 'Element', 'Mod Name', 'Mod Value', 'Tech', 'File Path']);
    });

    it('should return valid table row data for block entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockEntity), [
            'some-block', '', '', '', 'some-tech', 'some-path'
        ]);
    });

    it('should return valid table row data for block mod entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockModEntity), [
            'some-block', '', 'some-mod-name', 'some-mod-val', 'some-tech', 'some-path'
        ]);
    });

    it('should return valid table row data for block element entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockElemEntity), [
            'some-block', 'some-elem', '', '', 'some-tech', 'some-path'
        ]);
    });

    it('should return table row data for block element mod entity', function() {
        assert.deepEqual(tableUtil.getTableRow(blockElemModEntity), [
            'some-block', 'some-elem', 'some-mod-name', 'some-mod-val', 'some-tech', 'some-path'
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
