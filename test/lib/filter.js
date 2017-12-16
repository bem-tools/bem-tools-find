'use strict';

var Filter = require('../../lib/filter'),
    BemFile = require('@bem/sdk.file');

describe('Filter', function() {
    describe('apply', function() {
        testBySingleCriteria_('blocks', 'block');
        testBySingleCriteria_('elements', 'elem');
        testBySingleCriteria_('modifiers', 'modName');
        testBySingleCriteria_('techs', 'tech');

        it('should not pass if matches block, but not matches elem', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], elements : ['bar'] },
                { block : 'foo', elem : 'baz' }
            ));
        });

        it('should pass if matches block and element', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], elements : ['bar'] },
                { block : 'foo', elem : 'bar' }
            ));
        });

        it('should not pass if matches block, but does not matches modifier', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], modifiers : ['bar'] },
                { block : 'foo', modName : 'baz' }
            ));
        });

        it('should pass if it matches block and modifier', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], modifiers : ['bar'] },
                { block : 'foo', modName : 'bar' }
            ));
        });

        it('should not pass if matches block, but does not matches tech', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], techs : ['bar'] },
                { block : 'foo', tech : 'baz' }
            ));
        });

        it('should pass if it matches block and tech', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], techs : ['bar'] },
                { block : 'foo', tech : 'bar' }
            ));
        });

        it('should not pass if matches block and elem, but does not matches modifier', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], elements : ['bar'], modifiers : ['fizz'] },
                { block : 'foo', elem : 'bar', modName : 'buzz' }
            ));
        });

        it('should pass if it matches block, element and modifier', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], elements : ['bar'], modifiers : ['fizz'] },
                { block : 'foo', elem : 'bar', modName : 'fizz' }
            ));
        });

        it('should not pass if matches block, elem and modifier, but does not match tech', function() {
            assert.isNotOk(filterApply(
                {
                    blocks : ['foo'],
                    elements : ['bar'],
                    modifiers : ['fizz'],
                    techs : ['buzz']
                },
                {
                    block : 'foo',
                    elem : 'bar',
                    modName : 'fizz',
                    tech : 'BAZ'
                }
            ));
        });

        it('should pass if matches block, elem, modifier and tech', function() {
            assert.isOk(filterApply(
                {
                    blocks : ['foo'],
                    elements : ['bar'],
                    modifiers : ['fizz'],
                    techs : ['buzz']
                },
                {
                    block : 'foo',
                    elem : 'bar',
                    modName : 'fizz',
                    tech : 'buzz'
                }
            ));
        });

        it('should not pass if it matches block and elem, but does not match tech', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], elements : ['bar'], techs : ['buzz'] },
                { block : 'foo', elem : 'bar', tech : 'BAZ' }
            ));
        });

        it('should pass if it matches block, elem and tech', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], elements : ['bar'], techs : ['buzz'] },
                { block : 'foo', elem : 'bar', tech : 'buzz' }
            ));
        });

        it('should not pass if it matches block and mod, but does not match tech', function() {
            assert.isNotOk(filterApply(
                { blocks : ['foo'], modifiers : ['fizz'], techs : ['buzz'] },
                { block : 'foo', modName : 'fizz', tech : 'BAZ' }
            ));
        });

        it('should pass if it matches block, mod and tech', function() {
            assert.isOk(filterApply(
                { blocks : ['foo'], modifiers : ['fizz'], techs : ['buzz'] },
                { block : 'foo', modName : 'fizz', tech : 'buzz' }
            ));
        });
    });
});

function testBySingleCriteria_(optsField, itemField) {
    it('should pass ' + itemField + ' item if no info about ' + optsField + ' provided in config', function() {
        var item = {};
        item[itemField] = 'foo';

        assert.isOk(filterApply({}, item));
    });

    it('should pass ' + itemField + ' item if ' + itemField + ' matches ' + optsField + ' to search', function() {
        var filter = {}, item = {};
        filter[optsField] = ['foo'];
        item[itemField] = 'foo';

        assert.isOk(filterApply(filter, item));
    });

    it('should not pass ' + itemField + ' item if ' + itemField + 'not match ' + optsField + ' to search', function() {
        var filter = {}, item = {};
        filter[optsField] = ['foo'];
        item[itemField] = 'bar';


        assert.isNotOk(filterApply(filter, item));
    });
}

function filterApply(filter, item) {
    filter.block || (filter.block = 'foo');
    item.block || (item.block = 'foo');
    return (new Filter(filter)).apply(new BemFile({ cell : item }));
}
