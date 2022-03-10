const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"//8081->4200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to skillsme application." });
});


require("./app/routes/account.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/dev_project.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/devPro_comment.routes")(app);
require("./app/routes/post_comment.routes")(app);
require("./app/routes/proof_file.routes")(app);
require("./app/routes/feedback_file.routes")(app);
//require("./app/routes/dev_project.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});