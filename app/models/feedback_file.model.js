module.exports = (sequelize, Sequelize) => {
    const Feedback_File = sequelize.define("feedback_file", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING
        },
        name: {
        type: Sequelize.STRING
        },
        data: {
        type: Sequelize.BLOB
        },
    });
  
    return Feedback_File;
  };