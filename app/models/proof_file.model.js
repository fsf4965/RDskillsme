module.exports = (sequelize, Sequelize) => {
    const Proof_File = sequelize.define("proof_file", {
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
  
    return Proof_File;
  };