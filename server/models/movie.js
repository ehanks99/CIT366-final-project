const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schema = new Schema({
  movieId: {type: String, required: true},
  imageUrl: {type: String, required: true},
  name: {type: String, required: true},
  summary: {type: String, required: true},
  rating: {type: String, required: true},
  actors: [{type: String, required: true}],
  directors: [{type: String, required: true}],
  genres: [{type: String, required: true}]
});

module.exports = mongoose.model("Movie", schema);