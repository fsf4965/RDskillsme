var stream = require('stream');
const db = require("../models");
const Dev_Project = db.dev_projects;
const Op = db.Sequelize.Op;

// Create and Save a new Dev_Project
exports.create = (req, res) => {
  // Create a Dev_Project
  const devproject = {
    projectId: req.body.projectId,
    accountId: req.body.accountId,
    isuploaded:req.body.isuploaded,
    projectName:req.body.projectName,
    accountEmail: req.body.accountEmail,
  };

  // Save Dev_Project in the database
  Dev_Project.create(devproject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dev_Project."
      });
    });
};
//Download the file
exports.downloadFile = (req, res) => {
	Dev_Project.findByPk(req.params.id).then(file => {
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

// Retrieve all Dev_Projects from the database.
exports.findAll = (req, res) => {
  const accountId = req.query.accountId;
  var condition = accountId ? { accountId: { [Op.eq]: accountId } } : null;

  Dev_Project.findAll({ where: condition }
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dev_projects."
      });
    });
};

//Retrieve all Dev_Projects from the database that projectId is "projectId"
exports.findAllprojectIdis= (req, res) => {
  const projectId  = req.query.projectId ;
  var condition = projectId  ? { projectId: { [Op.eq]: projectId } ,isuploaded: true} : null ;

  Dev_Project.findAll({ where: condition}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dev_projects."
      });
    });
};

// Find a single Dev_Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dev_Project.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Dev_Project with id=" + id
      });
    });
};

// Update a Dev_Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const devproject = {
    type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer,
    projectId: req.body.projectId,
    accountId: req.body.accountId,
    isuploaded:req.body.isuploaded
  };

  Dev_Project.update(devproject, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dev_Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Dev_Project with id=${id}. Maybe Dev_Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dev_Project with id=" + id
      });
    });
};

// Delete a Dev_Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dev_Project.destroy({
    where: { id: id }
  } )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dev_Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Dev_Project with id=${id}. Maybe Dev_Project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Dev_Project with id=" + id
      });
    });
};

// Delete all Dev_Projects from the database.
exports.deleteAll = (req, res) => {
  Dev_Project.destroy({
    where: {},
    truncate: false
  } )
    .then(nums => {
      res.send({ message: `${nums} Dev_Projects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all dev_projects."
      });
    });
};

// Find all developing proejcts with current user id
exports.findAlluploaded = (req, res) => {
   Dev_Project.findAll({ where: { isuploaded: true} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dev projects."
      });
    });
};
