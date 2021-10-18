const db = require("../models");
const DevPro_Comments = db.devPro_comments;
const Op = db.Sequelize.Op;

// Create and Save a new DevPro_Comments
exports.create = (req, res) => {
  // Create a DevPro_Comments
  const devProcomments = {
    
    commentTxt: req.body.commentTxt,
    commenterEmail: req.body.commenterEmail,
    replyComment: req.body.replyComment,
    dev_projectId:req.body.dev_projectId,
  };

  // Save DevPro_Comments in the database
  DevPro_Comments.create(devProcomments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DevPro_Comments."
      });
    });
};

// Retrieve all DevPro_Commentss from the database.
exports.findAll = (req, res) => {
   const dev_projectId = req.query.dev_projectId;
    var condition = dev_projectId ? { dev_projectId: { [Op.eq]: dev_projectId} } : null;

  DevPro_Comments.findAll({ where: condition }
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving devPro_comments."
      });
    });
};

// Find a single DevPro_Comments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DevPro_Comments.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving DevPro_Comments with id=" + id
      });
    });
};

// Update a DevPro_Comments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DevPro_Comments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DevPro_Comments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update DevPro_Comments with id=${id}. Maybe DevPro_Comments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating DevPro_Comments with id=" + id
      });
    });
};

// Delete a DevPro_Comments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DevPro_Comments.destroy({
    where: { id: id }
  } )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DevPro_Comments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete DevPro_Comments with id=${id}. Maybe DevPro_Comments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete DevPro_Comments with id=" + id
      });
    });
};

// Delete all DevPro_Commentss from the database.
exports.deleteAll = (req, res) => {
  DevPro_Comments.destroy({
    where: {},
    truncate: false
  } )
    .then(nums => {
      res.send({ message: `${nums} DevPro_Commentss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all devPro_comments."
      });
    });
};


