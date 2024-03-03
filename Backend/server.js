const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Require User routes
require("./app/routes/user.routes.js")(app);

// Require Movie routes
require("./app/routes/movie.routes.js")(app);

// Require Genre routes
require("./app/routes/genre.routes.js")(app);

// Require Artist routes
require("./app/routes/artist.routes.js")(app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
