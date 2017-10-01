'use strict';

var Criteria = require('../../../lib/criteria/criteria');

describe('criteria', function() {
    describe('constructor', function() {
        testFieldInit_('blocks');
        testFieldInit_('elements');
        testFieldInit_('modifiers');
        testFieldInit_('techs');
    });

    describe('isEmpty', function() {
        it('should return true if criteria has no defined conditions', function() {
            var criteria = new Criteria({});

            assert.equal(criteria.isEmpty(), true);
        });

        it('should return false if criteria has at least 1 defined condition', function() {
            var criteria = new Criteria({
                blocks : ['foo']
            });

            assert.equal(criteria.isEmpty(), false);
        });
    });

    describe('isEqual', function() {
        it('should return false if comparing with something that is not a Criteria instance', function() {
            var criteria = new Criteria();

            assert.equal(criteria.isEqual({}), false);
        });

        it('should return false if at least one of conditions differs between 2 criterias', function() {
            var criteria = new Criteria({ blocks : ['foo'] }),
                another = new Criteria({ blocks : ['bar'] });

            assert.equal(criteria.isEqual(another), false);
        });

        it('should return true if both criterias has same conditions', function() {
            var criteria = new Criteria({ blocks : ['foo'] }),
                another = new Criteria({ blocks : ['foo'] });

            assert.equal(criteria.isEqual(another), true);
        });
    });
});

function testFieldInit_(fieldName) {
    it('should set field' + fieldName + 'if it passed', function() {
        var opts = {};
        opts[fieldName] = ['foo'];

        var criteria = new Criteria(opts);

        assert.deepEqual(criteria[fieldName], ['foo']);
    });

    it('should set field' + fieldName + 'as empty array if it was not passed', function() {
        var opts = {
            blocks : ['foo'],
            elements : ['bar'],
            modifiers : ['fizz'],
            techs : ['baz']
        };

        delete opts[fieldName];

        var criteria = new Criteria(opts);

        assert.deepEqual(criteria[fieldName], []);
    });
}
