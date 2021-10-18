module.exports = app => {
    const feedback_files = require("../controllers/feedback_file.controller.js");
    let upload = require('../config/multer.config.js');
 
    var router = require("express").Router();

    // Create a new feedback_file
    router.post('/upload', upload.single("file"), feedback_files.uploadFile);
 
    // Retrieve all feedback_files info
    router.get('/info', feedback_files.listAllFiles);
   
    // Download the feedback_files with id..
    router.get('/:id', feedback_files.downloadFile);

    // Delete the feedback_file with id..
    router.delete("/:id", feedback_files.deleteFile);

    // Delete all feedback_files
    router.delete("/", feedback_files.deleteAll);

    app.use('/skillsme/feedback_files', router);
  };
  