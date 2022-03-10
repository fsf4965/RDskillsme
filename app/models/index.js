const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
 

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("./account.model.js")(sequelize, Sequelize);

db.projects = require("./project.model.js")(sequelize, Sequelize);
db.dev_projects=require("./dev_project.model.js")(sequelize, Sequelize);
db.posts=require("./post.model.js")(sequelize, Sequelize);
db.devPro_comments=require("./devPro_comment.model")(sequelize, Sequelize);
db.post_comments=require("./post_comment.model")(sequelize, Sequelize);
db.proof_files = require("./proof_file.model.js")(sequelize, Sequelize);
db.feedback_files = require("./feedback_file.model.js")(sequelize, Sequelize);

//the relationship among tables
db.accounts.hasMany(db.dev_projects,{as:"dev_projects"});
db.dev_projects.belongsTo(db.accounts,{
  foreignKey:"accountId",
  as: "account",
});

db.accounts.hasMany(db.posts,{as:"posts"});
db.posts.belongsTo(db.accounts,{
  foreignKey:"accountId",
  as: "account",
});

db.accounts.hasOne(db.proof_files,{as:"proof_files"});
db.proof_files.belongsTo(db.accounts,{
  foreignKey:"accountId",
  as: "account",
});

db.projects.hasMany(db.dev_projects, { as: "dev_projects" });
db.dev_projects.belongsTo(db.projects,{
  foreignKey: "projectId",
  as: "project",
});

db.dev_projects.hasMany(db.feedback_files, { as: "feedback_files" });
db.feedback_files.belongsTo(db.dev_projects,{
  foreignKey: "dev_projectId",
  as: "dev_project_id",
});

db.dev_projects.hasMany(db.devPro_comments, { as: "devPro_comments" });
db.devPro_comments.belongsTo(db.dev_projects,{
  foreignKey: "dev_projectId",
  as: "dev_project_id",
});

db.posts.hasMany(db.post_comments, { as: "post_comments" });
db.post_comments.belongsTo(db.posts,{
  foreignKey: "postId",
  as: "post",
});

module.exports = db;
