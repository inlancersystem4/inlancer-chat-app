const { Sequelize } = require("sequelize");
const { db } = require(".");
const { successLog, errorLog } = require("../utils/logger");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: db.host,
  username: db.user,
  password: db.password,
  database: db.database,
  logging: false,
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    successLog.info("Database connection has been established successfully.");
    await sequelize.sync({ force: true });
    successLog.info("Database synchronized!");
  } catch (error) {
    errorLog.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, syncDatabase };
