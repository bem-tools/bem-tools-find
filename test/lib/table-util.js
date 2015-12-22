'use strict';
var tableUtil = require('../../lib/table-util');

describe('tableUtil', function() {
    it('should return valid table column headers', function() {
        assert.deepEqual(tableUtil.getTableHeader(),
            ['Block', 'Element', 'Mod Name', 'Mod Value', 'Tech', 'File Path']);
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
