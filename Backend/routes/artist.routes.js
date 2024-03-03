module.exports = (app) => {
  const artists = require("../controllers/artist.controller.js");

  // Retrieve all Artists
  app.get("/api/artists", artists.findAllArtists);
};
