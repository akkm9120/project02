const bookshelf = require('../bookshelf')

const Food = bookshelf.model('Food', {
    tableName:'foods'
});

module.exports = { Food };
