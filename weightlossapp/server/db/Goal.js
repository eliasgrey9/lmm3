const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("goal", {
  weightGoal: {
    type: Sequelize.INTEGER,
  },

  deadline: {
    type: Sequelize.DATEONLY,
  },

  validatorEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },

  goalReached: {
    type: Sequelize.BOOLEAN,
    defaultValue: null,
  },

  giftCardLink: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
});
