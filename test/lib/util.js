'use strict';

var _ = require('lodash'),
    util = require('../../lib/util');

describe('util', function() {
    describe('conditionsFromOptions', function() {
        var baseExpected = {
            levels : [],
            blocks : [],
            elements : [],
            modifiers : [],
            techs : []
        };

        it('should use given block option', function() {
            assert.deepEqual(util.conditionsFromOptions({ block : 'some-block' }),
                _.extend({}, baseExpected, { blocks : 'some-block' }));
        });

        it('should use empty array if block field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given element option', function() {
            assert.deepEqual(util.conditionsFromOptions({ element : 'some-elem' }),
                _.extend({}, baseExpected, { elements : 'some-elem' }));
        });

        it('should use empty array if element field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given modifier option', function() {
            assert.deepEqual(util.conditionsFromOptions({ modifier : 'some-mod' }),
                _.extend({}, baseExpected, { modifiers : 'some-mod' }));
        });

        it('should use empty array if modifier field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given tech option', function() {
            assert.deepEqual(util.conditionsFromOptions({ tech : 'some-tech' }),
                _.extend({}, baseExpected, { techs : 'some-tech' }));
        });

        it('should use empty array if tech field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });
    });

    describe('conditionsFromBEMItems', function() {
        it('should return empty conditions model if items were not set', function() {
            assert.deepEqual(util.conditionsFromBEMItems(), []);
        });

        it('should use given block name from BEM entity item', function() {
            var input = [{ block : 'some-block' }],
                expected = [{
                    levels : [],
                    blocks : ['some-block'],
                    elements : [],
                    modifiers : [],
                    techs : []
                }];
            assert.deepEqual(util.conditionsFromBEMItems(input), expected);
        });

        it('should use given block element name from BEM entity item', function() {
            var input = [{ elem : 'some-element' }],
                expected = [{
                    levels : [],
                    blocks : [],
                    elements : ['some-element'],
                    modifiers : [],
                    techs : []
                }];
            assert.deepEqual(util.conditionsFromBEMItems(input), expected);
        });

        it('should use given block modifier name from BEM entity item', function() {
            var input = [{ modName : 'some-modifier' }],
                expected = [{
                    levels : [],
                    blocks : [],
                    elements : [],
                    modifiers : ['some-modifier'],
                    techs : []
                }];
            assert.deepEqual(util.conditionsFromBEMItems(input), expected);
        });
    });

    describe('initializeConfig', function() {
        it('should return object with "getLevel" function', function() {
            var config = util.initializeConfig({ extended : {} });
            assert.instanceOf(config.getLevels, Function);
        });

        it('should return object with "getShema" function', function() {
            var config = util.initializeConfig({ extended : {} });
            assert.instanceOf(config.getSchema, Function);
        });

        it('should use [\'.\'] as default set of levels', function() {
            var config = util.initializeConfig({ extended : {} });
            assert.deepEqual(config.getLevels(), ['.']);
        });

        it('should use given levels as default set of levels', function() {
            var config = util.initializeConfig({ extended : { levels : ['level1', 'level2'] } });
            assert.deepEqual(config.getLevels(), ['level1', 'level2']);
        });

        it('should use default schema level options for given levels if levelOpts was not set', function() {
            var config = util.initializeConfig({ extended : { levels : ['level1'] } });
            assert.deepEqual(config.getSchema(), {
                levels : {
                    level1 : { scheme : 'nested' }
                }
            });
        });

        it('should use default schema for level if levelOpts for it were not set', function() {
            var config = util.initializeConfig({ extended : { levels : ['level1'], levelOpts : {} } });
            assert.deepEqual(config.getSchema(), {
                levels : {
                    level1 : { scheme : 'nested' }
                }
            });
        });

        it('should use default schema for level if levelOpts for it has not "schema" field', function() {
            var config = util.initializeConfig({ extended : { levels : ['level1'], levelOpts : {} } });
            assert.deepEqual(config.getSchema(), {
                levels : {
                    level1 : { scheme : 'nested' }
                }
            });
        });

        it('should use given schema for level', function() {
            var config = util.initializeConfig({ extended : {
                levels : ['level1'],
                levelOpts : {
                    level1 : {
                        scheme : 'flat'
                    }
                }
            } });
            assert.deepEqual(config.getSchema(), {
                levels : {
                    level1 : { scheme : 'flat' }
                }
            });
        });
    });

    describe('getFiltersForConditions', function() {
        it('should return result with apply function', function() {
            assert.instanceOf(util.getFiltersForConditions().apply, Function);
        });
    });
});
