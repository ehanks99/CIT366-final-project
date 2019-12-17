var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  maxMovieId: {type: String, required: true}
});

module.exports = mongoose.model("Sequence", schema);