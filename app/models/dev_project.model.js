module.exports = (sequelize, Sequelize) => {
    const Dev_Project = sequelize.define("dev_project", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isuploaded:{
        type: Sequelize.BOOLEAN,   
      },
      projectName:{
        type: Sequelize.STRING
      },
      accountEmail:{
        type: Sequelize.STRING
      },
      
// file attribute
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
    return Dev_Project;
}