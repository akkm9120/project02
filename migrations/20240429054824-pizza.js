'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('pizza',{
    'id' : {
      'type': 'int',
      'primaryKey' : true,
      'autoIncrement': true, 
      'unsigned': true 
    },
    'pizza_name': {
      'type':'string',
      'length': 100,
      'notNull': true
    },
    'cost': {
      'type':'int',
      'unsigned': true
    },
  });
};

exports.down = function(db) {
  return db.dropTable('pizza');
};

exports._meta = {
  "version": 1
};
