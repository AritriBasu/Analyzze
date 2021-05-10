const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      name: req.user.firstName
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    National news page
// @route   GET /national-news
router.get('/national-news',ensureAuth, (req, res) => {
  res.render('news')
})

// @desc    State news page
// @route   GET /state-news
router.get('/state-news',ensureAuth, (req, res) => {
  res.render('state-news')
})

// @desc    Ratings page
// @route   GET /rating
router.get('/rating',ensureAuth, (req, res) => {
  res.render('rating')
})
module.exports = router
