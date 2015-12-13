'use strict';
module.exports = function(view) {
    return {
        'plain': require('./plain'),
        'table': require('./table')
    }[view];
};
