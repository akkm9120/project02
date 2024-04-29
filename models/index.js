
//code indide model translate JS to Whatever DB language
//a model represents one table 

const bookshelf  = require('../bookshelf');

const Burger = bookshelf.model('Burger', {
    tableName:'burger'
});

module.exports = { Burger };
