const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    artistid: Number,
    first_name: String,
    last_name: String,
    wiki_url: String,
    profile_url: String,
    movies: [String],
  },
  { _id: false }
);

const theatreSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
  },
  { _id: false }
);

const showSchema = new mongoose.Schema(
  {
    id: Number,
    theatre: theatreSchema,
    language: String,
    show_timing: String,
    available_seats: String,
    unit_price: Number,
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema({
  movieid: Number,
  title: String,
  published: Boolean,
  released: Boolean,
  poster_url: String,
  release_date: String,
  publish_date: String,
  artists: [artistSchema],
  genres: [String],
  duration: Number,
  critic_rating: Number,
  trailer_url: String,
  wiki_url: String,
  story_line: String,
  shows: [showSchema],
});

const Movie = mongoose.model("Movie", movieSchema);
