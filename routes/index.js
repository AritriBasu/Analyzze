const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

// @desc    Sentiment page
// @route   GET /rating
router.get('/sentiment',ensureAuth, (req, res) => {
  res.render('sentiment')
})

//setting up oauth client
const oauth2Client = new OAuth2(
  "6426417407-bkqep1oj9smqn6ni1mh1phftcd1lgvj3.apps.googleusercontent.com", // ClientID
  "bMJWuCsbIxZCnmiUS4RyUGN7", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

//refresh and acess token
oauth2Client.setCredentials({
  refresh_token: "1//04asIrHei8ulMCgYIARAAGAQSNwF-L9IrHGMkHIGEybrLME2wyjtrsPpvyPQnHYvOAs1UDMBrWKV9mEX5KzbCjPXIpEJU3PAz51Q"
});
const accessToken = oauth2Client.getAccessToken()

//to get form data
router.post('/submit-data', function (req, res) {
  const output=`
  <p>You have a new contact request</p>
  <h3>Contact details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
    <h3>Message: <p>${req.body.message}</p></h3>
  `
  //nodemailer syntax

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "aritri.basu2019@vitstudent.ac.in", 
         clientId: "6426417407-bkqep1oj9smqn6ni1mh1phftcd1lgvj3.apps.googleusercontent.com",
         clientSecret: "bMJWuCsbIxZCnmiUS4RyUGN7",
         refreshToken: "1//04asIrHei8ulMCgYIARAAGAQSNwF-L9IrHGMkHIGEybrLME2wyjtrsPpvyPQnHYvOAs1UDMBrWKV9mEX5KzbCjPXIpEJU3PAz51Q",
         accessToken: accessToken
    },
    tls:{
      rejectUnauthorized:false
    }
});

  
  var mailOptions = {
    from: 'aritri.basu2019@vitstudent.ac.in',
    to: 'basusub@gmail.com',
    subject: 'New query from Political Monger',
    html: output
  };
  
  smtpTransport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      const errmsg="Your message could not be delivered. Please retry or contact us using the details below Hoping to hear from you soon!"
      res.render('dashboard',{msg:errmsg,name:req.user.firstName});
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  const sentmsg="Your request has been submitted. We will get back to you shortly!";
  //after submission
  res.render('dashboard',{msg:sentmsg, name:req.user.firstName});
  smtpTransport.close();
});


module.exports = router;
