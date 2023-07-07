const db = require("./database");
const User = require("./User");
const Payment = require("./Payment");
const Goal = require("./Goal");

User.hasMany(Payment);
User.hasMany(Goal);
Goal.hasMany(Payment);

module.exports = {
  db,
  User,
  Goal,
  Payment,
};
