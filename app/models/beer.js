'use strict'

const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  style: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 275
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Beer', beerSchema)
