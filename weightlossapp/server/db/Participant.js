const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("participant", {
  userId: {
    type: Sequelize.INTEGER,
  },
  currentWeight: {
    type: Sequelize.INTEGER,
  },
  challengeId: {
    type: Sequelize.INTEGER,
  },
  goalWeight: {
    type: Sequelize.INTEGER,
  },
  shield: {
    type: Sequelize.BOOLEAN,
  },
  outcome: {
    type: Sequelize.BOOLEAN,
  },
});
