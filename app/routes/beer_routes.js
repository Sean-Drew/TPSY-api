'use strict'

const express = require('express')
const passport = require('passport')
const Beer = require('../models/beer')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


// INDEX - GET /beers
router.get('/beers', requireToken, (req, res, next) => {
  Beer.find()
    .then(beers => {
      return beers.map(beer => beer.toObject())
    })
    .then(beers => res.status(200).json({ beers: beers }))
    .catch(next)
})

// CREATE - POST /beers
router.post('/beers', requireToken, (req, res, next) => {
  req.body.beer.owner = req.user.id

  Beer.create(req.body.beer)
    .then(beer => {
      res.status(201).json({ beer: beer.toObject() })
    })
    .catch(next)
})

module.exports = router
