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
 return db.createTable('register',{
    'id' : {
      'type': 'int',
      'primaryKey' : true,
      'autoIncrement': true, 
      'unsigned': true 
    },
    'ph_number': {
      'type':'string',
      'length': 100,
      'notNull': true
    },
    'gender': {
      'type': 'string',
      'length': 30,
      'notNull' : true
    },
    'password': {
      'type': 'string',
      'length': 30,
      'notNull' : true
    }
  });;
};

exports.down = function(db) {
  return db.dropTable('register');
};

exports._meta = {
  "version": 1
};
