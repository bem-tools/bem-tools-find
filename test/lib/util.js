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
            assert.deepEqual(
                util.conditionsFromOptions({ block : 'some-block' }),
                _.extend({}, baseExpected, { blocks : 'some-block' }));
        });

        it('should use empty array if block field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given element option', function() {
            assert.deepEqual(
                util.conditionsFromOptions({ element : 'some-elem' }),
                _.extend({}, baseExpected, { elements : 'some-elem' }));
        });

        it('should use empty array if element field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given modifier option', function() {
            assert.deepEqual(
                util.conditionsFromOptions({ modifier : 'some-mod' }),
                _.extend({}, baseExpected, { modifiers : 'some-mod' }));
        });

        it('should use empty array if modifier field was not set', function() {
            assert.deepEqual(util.conditionsFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given tech option', function() {
            assert.deepEqual(
                util.conditionsFromOptions({ tech : 'some-tech' }),
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
            assert.deepEqual(
                util.conditionsFromBEMItems([{ block : 'some-block' }]),
                [{
                    levels : [],
                    blocks : ['some-block'],
                    elements : [],
                    modifiers : [],
                    techs : []
                }]);
        });

        it('should use given block element name from BEM entity item', function() {
            assert.deepEqual(
                util.conditionsFromBEMItems([{ elem : 'some-element' }]),
                [{
                    levels : [],
                    blocks : [],
                    elements : ['some-element'],
                    modifiers : [],
                    techs : []
                }]);
        });

        it('should use given block modifier name from BEM entity item', function() {
            assert.deepEqual(
                util.conditionsFromBEMItems([{ modName : 'some-modifier' }]),
                [{
                    levels : [],
                    blocks : [],
                    elements : [],
                    modifiers : ['some-modifier'],
                    techs : []
                }]);
        });
    });

    describe('getFiltersForConditions', function() {
        it('should return result with apply function', function() {
            assert.instanceOf(util.getFiltersForConditions().apply, Function);
        });
    });
});
