'use strict'

// require in dependencies, model, middleware
const express = require('express')
const passport = require('passport')
const Beer = require('../models/beer')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// ************************************* //


// INDEX - GET /beers
router.get('/beers', requireToken, (req, res, next) => {
  Beer.find()
    .then(beers => {
      return beers.map(beer => beer.toObject())
    })
    .then(beers => res.status(200).json({ beers: beers }))
    .catch(next)
})

// SHOW - GET /beers/<id>
router.get('/beers/:id', requireToken, (req, res, next) => {
  Beer.findById(req.params.id)
    .then(handle404)
    .then(beer => res.status(200).json({ beer: beer.toObject() }))
    .catch(next)
})

// CREATE - POST /beers
router.post('/beers', requireToken, (req, res, next) => {
  req.body.owner = req.user.id

  Beer.create(req.body)
    .then(beer => {
      res.status(201).json({ beer: beer.toObject() })
    })
    .catch(next)
})

// UPDATE - PATCH /beers/<id>
router.patch('/beers/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.beer.owner

  Beer.findById(req.params.id)
    .then(handle404)
    .then(beer => {
      requireOwnership(req, beer)
      return beer.updateOne(req.body.beer)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY - DELETE /beers/<id>
router.delete('/beers/:id', requireToken, (req, res, next) => {
  Beer.findById(req.params.id)
    .then(handle404)
    .then(beer => {
      requireOwnership(req, beer)
      beer.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router
