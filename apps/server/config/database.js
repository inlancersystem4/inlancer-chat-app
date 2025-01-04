const { Sequelize } = require("sequelize");
const { db } = require(".");


const sequelize = new Sequelize({
  dialect: "mysql",
  host: db.host,
  username: db.user,
  password: db.password,
  database: db.database,
  logging: false,
});

module.exports = sequelize;
