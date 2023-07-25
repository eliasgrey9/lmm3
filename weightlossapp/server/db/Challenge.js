const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("challenge", {
  title: {
    type: Sequelize.STRING,
  },
  weightToLose: {
    type: Sequelize.INTEGER,
  },
  creatorId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
  units: {
    type: Sequelize.STRING,
  },
  prizeDescription: {
    type: Sequelize.STRING,
  },
});
