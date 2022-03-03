import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js"

const router = Router()

// GET - localhost:3000/movies
router.get("/", moviesCtrl.index)
// GET - localhost:3000/movies/new
router.get('/new', moviesCtrl.new)
// GET - localhost:3000/movies/:id
router.get("/:id", moviesCtrl.show)
// GET - localhost:3000/movies/:id/edit
router.get("/:id/edit", moviesCtrl.edit)

// POST - localhost:3000/movies
router.post("/", moviesCtrl.create)
// POST - localhost:3000/movies/:id/reviews
router.post("/:id/reviews", moviesCtrl.createReview)
// POST - localhost:3000/movies/:id/performers
router.post("/:id/performers", moviesCtrl.addToCast)

// DELETE - localhost:3000/movies/:id
router.delete("/:id", moviesCtrl.delete)

// PUT - localhost:3000/movies/:id
router.put("/:id", moviesCtrl.update)

export {
  router
}
