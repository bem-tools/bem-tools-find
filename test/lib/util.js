'use strict';

var _ = require('lodash'),
    util = require('../../lib/util');

describe('util', function() {
    describe('normalizeCliOptions', function() {
        var expected = {view: 'plain', cli: false};

        it('should use empty options and set defaults if options were not set', function() {
            assert.deepEqual(util.normalizeCliOptions(), expected);
        });

        it('should override view option', function() {
            assert.deepEqual(util.normalizeCliOptions({view: 'table'}), {view: 'table', cli: false});
        });

        it('should override cli option', function() {
            assert.deepEqual(util.normalizeCliOptions({cli: true}), {view: 'plain', cli: true});
        });

        it('should remove "block" option field', function() {
            assert.deepEqual(util.normalizeCliOptions({block: 'some-block'}), expected);
        });

        it('should remove "element" field', function() {
            assert.deepEqual(util.normalizeCliOptions({element: 'some-element'}), expected);
        });

        it('should remove "modifier" field', function() {
            assert.deepEqual(util.normalizeCliOptions({modifier: 'some-modifier'}), expected);
        });

        it('should remove "tech" option field', function() {
            assert.deepEqual(util.normalizeCliOptions({element: 'some-element'}), expected);
        });
    });

    describe('criteriaFromOptions', function() {
        var baseExpected = {
            blocks: [],
            elements: [],
            modifiers: [],
            techs: []
        };

        it('should use given block option', function() {
            assert.deepEqual(util.criteriaFromOptions({block: 'some-block'}),
                _.extend({}, baseExpected, {blocks: 'some-block'}));
        });

        it('should use empty array if block field was not set', function() {
            assert.deepEqual(util.criteriaFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given element option', function() {
            assert.deepEqual(util.criteriaFromOptions({element: 'some-elem'}),
                _.extend({}, baseExpected, {elements: 'some-elem'}));
        });

        it('should use empty array if element field was not set', function() {
            assert.deepEqual(util.criteriaFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given modifier option', function() {
            assert.deepEqual(util.criteriaFromOptions({modifier: 'some-mod'}),
                _.extend({}, baseExpected, {modifiers: 'some-mod'}));
        });

        it('should use empty array if modifier field was not set', function() {
            assert.deepEqual(util.criteriaFromOptions({}), _.extend({}, baseExpected));
        });

        it('should use given tech option', function() {
            assert.deepEqual(util.criteriaFromOptions({tech: 'some-tech'}),
                _.extend({}, baseExpected, {techs: 'some-tech'}));
        });

        it('should use empty array if tech field was not set', function() {
            assert.deepEqual(util.criteriaFromOptions({}), _.extend({}, baseExpected));
        });
    });
});
