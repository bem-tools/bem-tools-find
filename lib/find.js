'use strict';
var bemWalk = require('bem-walk'),
    streamFilter = require('through2-filter'),
    bemConfig = require('bem-config'),
    Filter = require('./filter'),
    Criteria = require('./criteria/criteria'),
    CriteriaCollection = require('./criteria/criteria-collection');

module.exports = function(criterias) {
    if (!Array.isArray(criterias)) {
        criterias = [criterias];
    }

    var filters = filtersForCriterias(criterias);
    var config = bemConfig().extended;
    config.levels = config.levels || ['.'];
    var scheme = {levels: config.levels.reduce(function(prev, level) {
        config.levelOpts = config.levelOpts || {};
        config.levelOpts[level] = config.levelOpts[level] || {};
        config.levelOpts[level].scheme = config.levelOpts[level].scheme || 'nested';
        prev[level] = {scheme: config.levelOpts[level].scheme};
        return prev;
    }, {})};

    return bemWalk(config.levels, scheme)
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
