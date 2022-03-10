module.exports = (sequelize, Sequelize) => {
    const Post_Comment = sequelize.define("post_comment", {
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
    return Post_Comment;
  };