module.exports = (app) => {
  const movies = require("../controllers/movie.controller.js");

  // Retrieve all Movies
  app.get("/api/movies", movies.findAllMovies);

  // Retrieve a single Movie with movieId
  app.get("/api/movies/:movieId", movies.findOne);

  // Retrieve all shows of a Movie with movieId
  app.get("/api/movies/:movieId/shows", movies.findShows);
};
