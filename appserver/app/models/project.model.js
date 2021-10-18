module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
     typeAllowed: {
        type: Sequelize.STRING
      },
      likes:{
        type: Sequelize.INTEGER,
      },
      dislikes:{
        type: Sequelize.INTEGER,
      }
    });
  
    return Project;
  };