module.exports = app => {
    const proof_files = require("../controllers/proof_file.controller.js");
    let upload = require('../config/multer.config.js');
 
    var router = require("express").Router();
  
    // Create a new proof_file
    router.post('/upload', upload.single("file"), proof_files.uploadFile);
 
    // Retrieve all proof_files info
    router.get('/info', proof_files.listAllFiles);
   
    // Download the proof_files with id..
    router.get('/:accountId', proof_files.downloadFile);

    // Delete the proof_file with id..
    router.delete("/:id", proof_files.deleteFile);

    // Delete all proof_files
    router.delete("/", proof_files.deleteAll);

    app.use('/skillsme/proof_files', router);
  };
  