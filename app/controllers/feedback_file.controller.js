var stream = require('stream');

const db = require("../models");
const Feedback_File = db.feedback_files;
const Op = db.Sequelize.Op;
exports.uploadFile = (req, res) => {
  //console.log(req);
	Feedback_File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer,
    dev_projectId: req.body.dev_projectId,
	}).then(() => {
		res.json({msg:'Feedback_File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}


// List all files
exports.listAllFiles = (req, res) => {
  const dev_projectId = req.query.dev_projectId;
  var condition = dev_projectId ? { dev_projectId: { [Op.eq]: dev_projectId} } : null;
	Feedback_File.findAll({ where: condition } ).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

//Download the file
exports.downloadFile = (req, res) => {
	Feedback_File.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

// Delete a File with the specified id in the request
exports.deleteFile = (req, res) => {
  const id = req.params.id;

  Feedback_File.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback_File was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Feedback_File with id=${id}. Maybe Feedback_File was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feedback_File with id=" + id
      });
    });
};

// Delete all File from the database.
exports.deleteAll = (req, res) => {
  Feedback_File.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Files were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all files."
      });
    });
};

