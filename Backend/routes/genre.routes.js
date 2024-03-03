module.exports = (app) => {
  const genres = require("../controllers/genre.controller.js");

  // Retrieve all Genres
  app.get("/api/genres", genres.findAllGenres);
};
