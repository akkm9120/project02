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
  return db.createTable('foods', {
      id: { type: 'int', primaryKey:true, notNull:true, autoIncrement:true, unsigned: true },
      food_name: { type: 'string', length:100, notNull:true },
      cost: { type: 'decimal', precision: 10, scale: 2 },
      description: 'text',
      availability: { type: 'boolean', notNull: true, defaultValue: true },
      
  });
};


exports.down = function(db) {
  return db.dropTable('foods');
};

exports._meta = {
  "version": 1
};
