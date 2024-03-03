const Artist = require("../models/artist.model.js");

// Retrieve and return all artists from the database.
exports.findAllArtists = (req, res) => {
  Artist.findAllArtists()
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving artists.",
      });
    });
};
