import { Performer } from "../models/performer.js"

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: "Add Performer",
      performers
    })
  })
}

function create(req, res) {
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new')
  })
}

export {
  newPerformer as new,
  create,
}