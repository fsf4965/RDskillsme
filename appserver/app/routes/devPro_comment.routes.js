module.exports = app => {
    const devPro_comments = require("../controllers/devPro_comment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new devPro_comments
    router.post("/", devPro_comments.create);
  
    // Retrieve all devPro_commentss
    router.get("/", devPro_comments.findAll);

    // Retrieve a single devPro_comments with id
    router.get("/:id", devPro_comments.findOne);
  
    // Update a devPro_comments with id
    router.put("/:id", devPro_comments.update);
  
    // Delete a devPro_comments with id
    router.delete("/:id", devPro_comments.delete);
  
    // Delete all devPro_commentss
    router.delete("/", devPro_comments.deleteAll);
  
    app.use('/skillsme/devPro_comments', router);
  };
  