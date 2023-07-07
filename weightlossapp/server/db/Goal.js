const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("goal", {
  pounds: {
    type: Sequelize.INTEGER,
  },

  paid: {
    type: Sequelize.BOOLEAN,
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
  },

  giftCardLink: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
});
