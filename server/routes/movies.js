var express = require('../../node_modules/express');
var router = express.Router();

const Movie = require("../models/movie");
const sequenceGenerator = require("./sequenceGenerator");

/* GET /api/movies page. */
router.get('/', function(req, res, next) {
  Movie.find()
    .then(movies => {
      // success
      res.status(200).json({
        message: "Movies fetched successfully!",
        movies: movies
      });
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
});

/* POST /api/movies */
router.post('/', function(req, res, next) {
  let maxMovieId = sequenceGenerator.nextId("movies");

  let movie = new Movie({
    movieId: maxMovieId,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    summary: req.body.summary,
    rating: req.body.rating,
    actors: req.body.actors,
    directors: req.body.directors,
    genres: req.body.genres
  });

  saveMovie(res, movie);
});

/* PUT /api/movies */
router.put('/:id', function(req, res, next) {
  Movie.findOne({movieId: req.params.id}, function (err, movie) {
    if (err || !movie) {
      return res.status(500).json({
        title: "No Movie Found",
        error: {movie: "Movie not found"}
      });
    }

    movie.imageUrl = req.body.imageUrl;
    movie.name = req.body.name;
    movie.summary = req.body.summary;
    movie.rating = req.body.rating;
    movie.actors = req.body.actors;
    movie.directors = req.body.directors;
    movie.genres = req.body.genres;

    saveMovie(res, movie);
  });
});

/* DELETE /api/movies */
router.delete('/:id', function(req, res, next) {
  var query = {movieId: req.params.id};

  Movie.findOne(query, function (err, movie) {
    if (err) {
      return res.status(500).json({
        title: "No Movie Found",
        error: err
      });
    }
    if (!movie) {
      return res.status(500).json({
        title: "No Movie Found",
        error: {movieId: req.params.id}
      });
    }

    Movie.deleteOne({ _id: movie._id })
      .then(result => {
        res.status(201).json({
          message: "Movie deleted successfully"
        })
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

function saveMovie(res, movie) {  
  movie.save()
    .then(writeResult => {
      // success
      res.status(201).json({
        message: "Movie saved successfully",
        movie: movie
      })
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

module.exports = router;