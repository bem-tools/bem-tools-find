'use strict';
var bemWalk = require('bem-walk'),
    stringify = require('JSONStream').stringify;

module.exports = function(options) {
    return bemWalk(getLevels(), getSchema()).pipe(stringify()).pipe(process.stdout);
};

function normalizeOptions(options) {
    // TODO implement this code
}

//TODO hard code
function getLevels() {
    return require('../draft/levels');
}

//TODO hard code
function getSchema() {
    return require('../draft/schema');
}
