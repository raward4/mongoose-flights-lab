import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number, 
    default: function() {
      return new Date().getFullYear()
    },
    min: 1927
  },
  mpaaRating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R"]
  },
  nowShowing: {type: Boolean, default: false},
  reviews: [reviewSchema],
  cast: [{ type: Schema.Types.ObjectId, ref: "Performer" }]
}, {
  timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

export {
  Movie
}