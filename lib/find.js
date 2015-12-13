'use strict';
var bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    Filter = require('./filter'),
    Criteria = require('./criteria/criteria'),
    CriteriaCollection = require('./criteria/criteria-collection');

module.exports = function(criterias) {
    if (!Array.isArray(criterias)) {
        criterias = [criterias];
    }

    var filters = filtersForCriterias(criterias);

    return bemWalk(require('../draft/levels'), require('../draft/schema'))
        .pipe(streamFilter.obj(function(item) {
            return filters.some(function(filter) {
                return filter.apply(item);
            });
        }));
};

function filtersForCriterias(criterias) {
    var collection = new CriteriaCollection(criterias.map(function(criteria) {
        return new Criteria(criteria);
    }));

    return collection.getFilterCriteria().map(function(criteria) {
        return new Filter(criteria);
    });
}
