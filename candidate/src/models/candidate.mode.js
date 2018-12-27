const config = require("config");
const schema = config.get("db.schema");

module.exports = function(sequelize, type) {
  const Candidate = sequelize.define(
    "Candidate",
    {
      name: {
        type: type.STRING,
        unique: true,
        allowNull: false
      },
      gender: {
        type: type.TINYINT,
        allowNull: false
      },
      resume: {
        type: type.STRING,
        allowNull: false
      },
      votes: {
        type: type.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      avatar: {
        type: type.STRING,
        allowNull: true
      },
      rank: {
        type: type.INTEGER,
        allowNull: true
      }
    },
    {
      paranoid: false,
      tableName: "candidate",
      freezeTableName: true,
      schema: schema
    }
  );
  return Candidate;
};
