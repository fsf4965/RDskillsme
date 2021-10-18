module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      likes:{
        type: Sequelize.INTEGER,
      },
      dislikes:{
        type: Sequelize.INTEGER,
      }
    });

    return Post;
  };