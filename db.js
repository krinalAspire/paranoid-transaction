const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('test',process.env.user, process.env.password,{
    host: 'localhost', 
    dialect: 'postgres',
    operatorsAliases: 0,
    port:5432,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    storage: 'path/to/database.sqlite'
  });

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sq: sequelize, testDbConnection };