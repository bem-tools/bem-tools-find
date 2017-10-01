'use strict';

var Criteria = require('./criteria');

var CriteriaCollection = function(criterias) {
    criterias = criterias
        ? Array.isArray(criterias)? criterias : [criterias]
        : [];

    this._criterias = [];

    criterias.forEach(this.addCriteria.bind(this));
};

CriteriaCollection.prototype = {
    addCriteria : function(criteria) {
        if(!(criteria instanceof Criteria))
            throw new Error('Unable to add something not instance of Criteria');


        this._criterias.push(criteria);
    },

    getFilterCriteria : function() {
        if(!this._criterias.length)
            return [];


        if(this._areAllCriteriaEmpty())
            return [this._criterias[0]];
        else
            return this._criterias.filter(function(criteria) {
                return !criteria.isEmpty();
            });

    },

    _areAllCriteriaEmpty : function() {
        return this._criterias.every(function(criteria) {
            return criteria.isEmpty();
        });
    }
};

module.exports = CriteriaCollection;
