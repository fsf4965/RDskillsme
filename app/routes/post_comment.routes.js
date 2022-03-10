module.exports = app => {
    const post_comments = require("../controllers/post_comment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new post_comments
    router.post("/", post_comments.create);
  
    // Retrieve all post_comments
    router.get("/", post_comments.findAll);

    // Retrieve a single post_comments with id
    router.get("/:id", post_comments.findOne);
  
    // Update a post_comments with id
    router.put("/:id", post_comments.update);
  
    // Delete a post_comments with id
    router.delete("/:id", post_comments.delete);
  
    // Delete all post_comments
    router.delete("/", post_comments.deleteAll);
  
    app.use('/skillsme/post_comments', router);
  };
  