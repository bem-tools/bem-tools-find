'use strict';

var util = require('../../lib/util');

describe('util', function() {
    describe('getEntityColor', function() {
        it('should return "cyan" for elem modifier entity', function() {
            assert.equal(util.getEntityColor({
                block: 'some-block',
                elem: 'some__elem',
                modName: 'some__elem_mod'
            }), 'cyan');
        });

        it('should return "green" for elem entity', function() {
            assert.equal(util.getEntityColor({
                block: 'some-block',
                elem: 'some__elem'
            }), 'green');
        });

        it('should return "yellow" for block modifier entity', function() {
            assert.equal(util.getEntityColor({
                block: 'some-block',
                modName: 'some_mod'
            }), 'yellow');
        });

        it('should return "red" for block entity', function() {
            assert.equal(util.getEntityColor({
                block: 'some-block'
            }), 'red');
        });
    });
});
