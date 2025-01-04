const User = require("./user");
const Session = require("./session");

User.hasMany(Session, { foreignKey: "user_id", as: "sessions" });
Session.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Session };
