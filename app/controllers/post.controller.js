const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Post
  const post = {
    post_id: req.body.post_id,
    title: req.body.title,
    description: req.body.description,
    accountId: req.body.accountId,
    likes:req.body.likes ? req.body.likes : 0,
    dislikes:req.body.likes ? req.body.dislikes : 0
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const accountId = req.query.accountId;
  var condition = accountId ? { accountId: { [Op.eq]: accountId } } : null;
  
  Post.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const post_id = req.params.id;

  Post.findByPk(post_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with post_id=" + post_id
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const post_id = req.params.id;

  Post.update(req.body, {
    where: { post_id: post_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with post_id=${post_id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with post_id=" + post_id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const post_id = req.params.id;

  Post.destroy({
    where: { post_id: post_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with post_id=${post_id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with post_id=" + post_id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};
