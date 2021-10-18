var stream = require('stream');

const db = require("../models");
const Proof_File = db.proof_files;
const Op = db.Sequelize.Op;
exports.uploadFile = (req, res) => {
  //console.log(req);
	Proof_File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer,
        accountId: req.body.accountId,
	}).then(() => {
		res.json({msg:'Proof_File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.listAllFiles = (req, res) => {
  const accountId = req.query.accountId;
  var condition = accountId ? { accountId: { [Op.eq]: accountId} } : null;
	Proof_File.findAll({ where: condition } ).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
  const accountId=req.params.accountId;
	Proof_File.findOne({ where: { accountId:accountId }}).then(file => {
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

// Delete a Proof_File with the specified id in the request
exports.deleteFile = (req, res) => {
  const id = req.params.id;

  Proof_File.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proof_File was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Proof_File with id=${id}. Maybe Proof_File was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proof_File with id=" + id
      });
    });
};

// Delete all Proof_File from the database.
exports.deleteAll = (req, res) => {
  Proof_File.destroy({
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


