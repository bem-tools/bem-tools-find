'use strict';

var Filter = require('../../lib/filter');

describe('Filter', function() {
    describe('apply', function() {
        testBySingleCriteria_('elements', 'elem');
        testBySingleCriteria_('modifiers', 'modName');
        testBySingleCriteria_('techs', 'tech');

        it('should pass block item if no info about blocks provided in config', function() {
            var filter = new Filter({}),
                item = {
                    entity: {
                        block: 'foo'
                    }
                };
            assert.equal(filter.apply(item), true);
        });

        it('should pass block item if block matches blocks to search', function() {
            var opts = {
                blocks: 'foo'
            };
            var filter = new Filter(opts),
                item = {
                    entity: {
                        block: 'foo'
                    }
                };
            assert.equal(filter.apply(item), true);
        });

        it('should not pass block item if block not match blocks to search', function() {
            var opts = {
                blocks: ['foo']
            };
            var filter = new Filter(opts),
                item = {
                    entity: {
                        block: 'bar'
                    }
                };

            assert.equal(filter.apply(item), false);
        });

        it('should not pass if matches block, but not matches elem', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'baz'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if matches block and element', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if matches block, but does not matches modifier', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    modifiers: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    modName: 'baz'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if it matches block and modifier', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    modifiers: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    modName: 'bar'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if matches block, but does not matches tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    techs: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    tech: 'baz'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if it matches block and tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    techs: ['bar']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    tech: 'bar'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if matches block and elem, but does not matches modifier', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    modifiers: ['fizz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    modName: 'buzz'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if it matches block, element and modifier', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    modifiers: ['fizz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    modName: 'fizz'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if matches block, elem and modifier, but does not match tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    modifiers: ['fizz'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    modName: 'fizz',
                    tech: 'BAZ'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if matches block, elem, modifier and tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    modifiers: ['fizz'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    modName: 'fizz',
                    tech: 'buzz'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if it matches block and elem, but does not match tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    tech: 'BAZ'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if it matches block, elem and tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    elements: ['bar'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    elem: 'bar',
                    tech: 'buzz'
                };

            assert.equal(filter.apply(item), true);
        });

        it('should not pass if it matches block and mod, but does not match tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    modifiers: ['fizz'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    modName: 'fizz',
                    tech: 'BAZ'
                };

            assert.equal(filter.apply(item), false);
        });

        it('should pass if it matches block, mod and tech', function() {
            var filter = new Filter({
                    blocks: ['foo'],
                    modifiers: ['fizz'],
                    techs: ['buzz']
                }),
                item = {
                    entity: {
                        block: 'foo'
                    },
                    modName: 'fizz',
                    tech: 'buzz'
                };

            assert.equal(filter.apply(item), true);
        });
    });
});

function testBySingleCriteria_(optsField, itemField) {
    it('should pass ' + itemField + ' item if no info about ' + optsField + ' provided in config', function() {
        var filter = new Filter({}),
            item = {};

        item[itemField] = 'foo';

        assert.equal(filter.apply(item), true);
    });

    it('should pass ' + itemField + ' item if ' + itemField + ' matches ' + optsField + ' to search', function() {
        var opts = {};
        opts[optsField] = ['foo'];

        var filter = new Filter(opts),
            item = {};

        item[itemField] = 'foo';

        assert.equal(filter.apply(item), true);
    });

    it('should not pass ' + itemField + ' item if ' + itemField + 'not match ' + optsField + ' to search', function() {
        var opts = {};
        opts[optsField] = ['foo'];

        var filter = new Filter(opts),
            item = {};

        item[itemField] = 'bar';

        assert.equal(filter.apply(item), false);
    });
}
