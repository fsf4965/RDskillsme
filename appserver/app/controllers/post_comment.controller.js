const db = require("../models");
const Post_Comments = db.post_comments;
const Op = db.Sequelize.Op;

// Create and Save a new Post_Comments
exports.create = (req, res) => {
  // Create a Post_Comments
  const postcomments = {
    
    commentTxt: req.body.commentTxt,
    commenterEmail: req.body.commenterEmail,
    replyComment: req.body.replyComment,
    postId:req.body.postId,
  };

  // Save Post_Comments in the database
  Post_Comments.create(postcomments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post_Comments."
      });
    });
};

// Retrieve all Post_Commentss from the database.
exports.findAll = (req, res) => {
   const postId = req.query.postId;
    var condition = postId ? { postId: { [Op.eq]: postId} } : null;

  Post_Comments.findAll({ where: condition }
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving post_comments."
      });
    });
};

// Find a single Post_Comments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post_Comments.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post_Comments with id=" + id
      });
    });
};

// Update a Post_Comments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post_Comments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post_Comments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post_Comments with id=${id}. Maybe Post_Comments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post_Comments with id=" + id
      });
    });
};

// Delete a Post_Comments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post_Comments.destroy({
    where: { id: id }
  } )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post_Comments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post_Comments with id=${id}. Maybe Post_Comments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post_Comments with id=" + id
      });
    });
};

// Delete all Post_Commentss from the database.
exports.deleteAll = (req, res) => {
  Post_Comments.destroy({
    where: {},
    truncate: false
  } )
    .then(nums => {
      res.send({ message: `${nums} Post_Comments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all post_comments."
      });
    });
};


