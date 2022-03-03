import { Movie } from "../models/movie.js"
import { Performer } from "../models/performer.js"

function newMovie(req, res) {
  res.render('movies/new', {
    title: "Add Movie"
  })
}

function create(req, res) {
  console.log("req.body before", req.body)
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  console.log("req.body after", req.body)
  // New
  const movie = new Movie(req.body)
  console.log(movie)
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new')
    res.redirect(`/movies/${movie._id}`)
  })
  // Old
  // Movie.create(req.body, function(err, movie) {
  //   if (err) return res.redirect('/movies/new')
  //   res.redirect('/movies/new')
  // })
}

function index(req, res) {
  Movie.find({}, function (error, movies) {
    console.log(error)
    res.render("movies/index", {
      error: error,
      movies: movies,
      title: 'All Movies',
    })
  })
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast')
  .exec(function (err, movie) {
    Performer.find({_id: {$nin: movie.cast}}, function (err, performers) {
      console.log("movie ", movie)
      console.log("performers: ", performers)
      res.render("movies/show", {
        movie: movie,
        title: "Movie Detail",
        performers,
      })
    })
  })
}

function deleteMovie(req, res) {
  Movie.findByIdAndDelete(req.params.id, function(err, movie) {
    res.redirect("/movies")
  })
}

function edit(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    res.render("movies/edit", {
      movie, // same as: movie: movie
      err,
      title: "Edit Movie"
    })
  })
}

function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Movie.findByIdAndUpdate(req.params.id, req.body, function (err, movie) {
    res.redirect(`/movies/${movie._id}`)
  })
}

function createReview(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    movie.reviews.push(req.body)
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`)
    })
  })
}

function addToCast(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    movie.cast.push(req.body.performerId)
    movie.save(function (err) {
      res.redirect(`/movies/${movie._id}`)
    })
  })
}

export {
  newMovie as new,
  create,
  index,
  show,
  deleteMovie as delete,
  edit,
  update,
  createReview,
  addToCast,
}