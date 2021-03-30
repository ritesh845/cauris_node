const dbConfig = require('../../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port:dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
const db = {};

db.Sequelize = Sequelize;
db.Sequelize = sequelize;
db.users = require('./users')(sequelize, Sequelize);
db.talents = require('./talents')(sequelize, Sequelize);
module.exports = db;

