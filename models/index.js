// models/index.js
const { Sequelize } = require("sequelize");
const { database, username, password, host, dialect } = require("../config");

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Sale = require("./Sale")(sequelize, Sequelize);
db.Item = require("./Item")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);

module.exports = db;
