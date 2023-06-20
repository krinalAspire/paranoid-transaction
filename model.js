const { sq } = require("./db");

const { DataTypes } = require("sequelize");

const User = sq.define("user_roles", {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    } },
    { paranoid: true}
    );

  User.sync({alter:true}).then(() => {
    console.log("User Model synced");
  });

  module.exports = User;
