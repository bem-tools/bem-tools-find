'use strict';

var Criteria = require('../../../lib/criteria/criteria'),
    CriteriaCollection = require('../../../lib/criteria/criteria-collection');

describe('CriteriaCollection', function() {
    describe('constructor', function() {
        it('should add passed criteria', function() {
            var criteria = new Criteria(),
                collection = new CriteriaCollection(criteria);

            assert.equal(criteria, collection.getFilterCriteria()[0]);
        });

        it('should accept criteria passed as array', function() {
            var criteria = new Criteria(),
                collection = new CriteriaCollection([criteria]);

            assert.equal(criteria, collection.getFilterCriteria()[0]);
        });
    });

    describe('addCriteria', function() {
        it('should throw if passed something that is not a `Criteria` instance', function() {
            var collection = new CriteriaCollection();

            assert.throw(collection.addCriteria.bind(collection, {}));
        });

        it('should add criteria', function() {
            var criteria = new Criteria(),
                collection = new CriteriaCollection();

            collection.addCriteria(criteria);

            assert.deepEqual([criteria], collection.getFilterCriteria());
        });
    });

    describe('getFilterCriteria', function() {
        it('should return empty array if no criterias added to collection', function() {
            var collection = new CriteriaCollection();

            assert.deepEqual([], collection.getFilterCriteria());
        });

        it('should return single empty criteria if added multiple empty criteria and nothing else', function() {
            var collection = new CriteriaCollection();

            collection.addCriteria(new Criteria());
            collection.addCriteria(new Criteria());

            assert.deepEqual(collection.getFilterCriteria(), [new Criteria()]);
        });

        it('should remove all empty criteria if added at least 1 non-empty criteria', function() {
            var nonEmptyCriteria = new Criteria({
                    blocks : ['foo']
                }),
                collection = new CriteriaCollection(nonEmptyCriteria);

            collection.addCriteria(new Criteria());
            collection.addCriteria(new Criteria());

            assert.deepEqual(collection.getFilterCriteria(), [nonEmptyCriteria]);
        });

        it('should return all non-empty criteria', function() {
            var criteria = new Criteria({
                    blocks : ['foo']
                }),
                anotherCriteria = new Criteria({
                    blocks : ['bar']
                }),
                collection = new CriteriaCollection([criteria, anotherCriteria]);

            assert.deepEqual(collection.getFilterCriteria(), [criteria, anotherCriteria]);
        });
    });
});
