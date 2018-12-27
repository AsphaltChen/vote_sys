const config = require("config");
const schema = config.get("db.schema");

module.exports = function(sequelize, type) {
  const Voter = sequelize.define(
    "Voter",
    {
      mail: {
        type: type.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: type.STRING,
        allowNull: false
      },
      salt: {
        type: type.STRING,
        allowNull: false
      },
      state: {
        type: type.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      paranoid: false,
      tableName: "voter",
      freezeTableName: true,
      schema: schema
    }
  );
  return Voter;
};
