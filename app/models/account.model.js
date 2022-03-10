module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      university: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminAccount:{
        type: Sequelize.BOOLEAN,
      },
      isactivated:{
        type: Sequelize.BOOLEAN,
      } 
    });
  
    return Account;
  };