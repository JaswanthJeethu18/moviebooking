const Genre = require("../models/genre.model.js");

// Retrieve and return all genres from the database.
exports.findAllGenres = (req, res) => {
  Genre.findAllGenres()
    .then((genres) => {
      res.send(genres);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genres.",
      });
    });
};
