const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Like = require("../models/Like")

router.get("/all-musicians", (req, res) => {
  User.find({artistType: 'musician'})
  .then(allMusicians => {
    res.json({allMusicians})
  })
})

router.get("/all-bands", (req, res) => {
  User.find({artistType: 'band'})
  .then(allBands => {
    res.json({allBands})
  })
})

router.get("/guitarists", (req, res) => {
  User.find({artistType: 'musician', instrument: 'guitarist'})
  .then(allGuitarists => {
    res.json({allGuitarists})
  })
})

router.get("/singers", (req, res) => {
  User.find({artistType: 'musician', instrument: 'singer'})
  .then(allSingers => {
    res.json({allSingers})
  })
})

router.get("/drummers", (req, res) => {
  User.find({artistType: 'musician', instrument: 'drummer'})
  .then(allDrummers => {
    res.json({allDrummers})
  })
})

router.post("/like-video", (req, res) => {
  let bandEmail = req.body.bandEmail
  let musicianEmail = req.body.musicianEmail
  User.update(
    {email: bandEmail},
    {$push: {likedMusicians: musicianEmail}}
  )
})

module.exports = router;