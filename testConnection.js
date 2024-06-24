// testConnection.js
const { Sequelize } = require("sequelize");
const { database, username, password, host, dialect } = require("./config");

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
