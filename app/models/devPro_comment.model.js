module.exports = (sequelize, Sequelize) => {
    const DevPro_Comment = sequelize.define("devpro_comment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      commentTxt: {
        type: Sequelize.STRING
      },
      commenterEmail:{
          type:Sequelize.STRING
      },
      replyComment:{
        type:Sequelize.ARRAY(Sequelize.TEXT)
    }
    });
    return DevPro_Comment;
  };