'use strict';

var _ = require('lodash'),
    Tree = require('../../../../lib/view/utils/tree');

describe('Tree', function() {
    var tree,
        levelItem = { level : 'some-level' },
        blockItem = _.extend({}, levelItem, {
            block : 'some-block',
            tech : 'some-tech',
            path : 'some-path'
        }),
        blockModeItem = _.extend({}, levelItem, blockItem, {
            modName : 'some-mod-name',
            modVal : 'some-mod-val'
        }),
        elemItem = _.extend({}, levelItem, blockItem, {
            elem : 'some-elem'
        }),
        elemModeItem = _.extend({}, levelItem, blockItem, elemItem, {
            modName : 'some-elem-mod-name',
            modVal : 'some-elem-mod-val'
        });

    function getChild(order) {
        var result = tree.getTree();
        for(var i = 1; i <= order; i++)
            result = result.nodes[0];

        return result;
    }

    beforeEach(function() {
        tree = new Tree('some-title');
    });

    it('should create tree with given title', function() {
        assert.equal(tree.getTree().label, 'some-title');
    });

    it('should create tree with empty nodes array', function() {
        assert.lengthOf(tree.getTree().nodes, 0);
    });

    describe('add level node', function() {
        it('should add level node if it does not exist yet', function() {
            tree.addNode(levelItem);
            assert.deepEqual(getChild(1), { label : 'some-level', nodes : [] });
        });

        it('should not add level nodes with same labels multiple times', function() {
            tree.addNode(levelItem);
            tree.addNode(levelItem);

            assert.lengthOf(tree.getTree().nodes, 1);
        });

        it('should return founded or created level node', function() {
            assert.deepEqual(tree.addNode(levelItem), { label : 'some-level', nodes : [] });
        });
    });

    describe('add block node', function() {
        var treeItem = { label : 'some-block', nodes : [], leaf : { 'some-tech' : 'some-path' } };

        it('should add block node if it does not exist yet', function() {
            tree.addNode(blockItem, true);
            assert.deepEqual(getChild(2), treeItem);
        });

        it('should not add block nodes with same labels multiple times', function() {
            tree.addNode(blockItem, true);
            tree.addNode(blockItem, true);

            assert.lengthOf(getChild(1).nodes, 1);
        });

        it('should return founded or created block node', function() {
            assert.deepEqual(tree.addNode(blockItem, true), treeItem);
        });
    });

    describe('addModeNode', function() {
        var treeItem = {
            label : '_some-mod-name',
            nodes : [
                {
                    label : 'some-mod-val',
                    nodes : [],
                    leaf : { 'some-tech' : 'some-path' }
                }
            ]
        };

        it('should add block mode node if it does not exist yet', function() {
            tree.addNode(blockModeItem, true);
            assert.deepEqual(getChild(3), treeItem);
        });

        it('should not add block mode nodes with same labels multiple times', function() {
            tree.addNode(blockModeItem, true);
            tree.addNode(blockModeItem, true);

            assert.lengthOf(getChild(2).nodes, 1);
        });

        it('should return founded or created block mode node', function() {
            assert(tree.addNode(blockModeItem, true), treeItem);
        });
    });

    describe('addElemNode', function() {
        var treeItem = {
            label : '__some-elem',
            nodes : [],
            leaf : { 'some-tech' : 'some-path' }
        };

        it('should add elem node if it does not exist yet', function() {
            tree.addNode(elemItem, true);
            assert.deepEqual(getChild(3), treeItem);
        });

        it('should not add elem nodes with same labels multiple times', function() {
            tree.addNode(elemItem, true);
            tree.addNode(elemItem, true);

            assert.lengthOf(getChild(2).nodes, 1);
        });

        it('should return founded or created elem node', function() {
            assert(tree.addNode(elemItem, true), treeItem);
        });
    });

    describe('addElemModeNode', function() {
        var treeItem = {
            label : '_some-elem-mod-name',
            nodes : [
                {
                    label : 'some-elem-mod-val',
                    nodes : [],
                    leaf : { 'some-tech' : 'some-path' }
                }
            ]
        };

        it('should add elem mode node if it does not exist yet', function() {
            tree.addNode(elemModeItem, true);
            assert.deepEqual(getChild(4), treeItem);
        });

        it('should not add elem mode nodes with same labels multiple times', function() {
            tree.addNode(elemModeItem, true);
            tree.addNode(elemModeItem, true);

            assert.lengthOf(getChild(3).nodes, 1);
        });

        it('should return founded or created elem mode node', function() {
            assert(tree.addNode(elemModeItem, true), treeItem);
        });
    });
});
