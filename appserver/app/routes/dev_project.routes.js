module.exports = app => {
    const dev_projects = require("../controllers/dev_project.controller.js");

    let upload = require('../config/multer.config.js');
  
    var router = require("express").Router();
  
    // Create a new dev_project
    router.post("/", dev_projects.create);
  
    // Retrieve all dev_projects
    router.get("/", dev_projects.findAll);

    // Retrieve all dev_projects with project id is...
    router.get("/projectId", dev_projects.findAllprojectIdis);

    // Retrieve all dev_projects with file upload status is true
    router.get("/uploaded", dev_projects.findAlluploaded);

    // Retrieve a single dev_project with id
    router.get("/:id", dev_projects.findOne);
  
    // Update/upload file a dev_project with id
    router.put("/:id", upload.single("file"),dev_projects.update);

    // Download the files with id..
    router.get('/download/:id', dev_projects.downloadFile);
  
    // Delete a dev_project with id
    router.delete("/:id", dev_projects.delete);
  
    // Delete all dev_projects
    router.delete("/", dev_projects.deleteAll);
  
    app.use('/skillsme/dev_projects', router);
  };
  