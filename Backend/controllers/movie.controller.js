const Movie = require("../models/movie.model.js");

// Retrieve and return all movies by status from the database.
exports.findAllMovies = (req, res) => {
  Movie.findAllMovies(req.query.status)
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies.",
      });
    });
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({
          message: "Movie not found with id " + req.params.movieId,
        });
      }
      res.send(movie);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Movie not found with id " + req.params.movieId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving movie with id " + req.params.movieId,
      });
    });
};

// Find all shows of a movie with a movieId
exports.findShows = (req, res) => {
  Movie.findShows(req.params.movieId)
    .then((shows) => {
      if (!shows) {
        return res.status(404).send({
          message: "No shows found for movie with id " + req.params.movieId,
        });
      }
      res.send(shows);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Movie not found with id " + req.params.movieId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving shows for movie with id " + req.params.movieId,
      });
    });
};
