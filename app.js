const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
var Twit = require('twit');
var Sentiment =require('sentiment');

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

//Sentiment Analysis
var T = new Twit({
  consumer_key:process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
  access_token:process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/search/:key',(req,res)=>{
  var sentKey=req.params.key;
  console.log(sentKey);
  let tweetsArr = []

  //fetching tweets with the keyword
  var params = {
      q:sentKey,
      count: 10
  }
   
  T.get('search/tweets',params,function(err,data,response){
      var tweetText;
      if(!err){
          for(let i = 0; i < data.statuses.length; i++){
              var tweetText=data.statuses[i].text;
              //console.log(`Tweet text ${i} ${tweetText}`);

              //sentiment analysis
              var sentiment=new Sentiment();
              var docx=sentiment.analyze(tweetText);
              // console.log(docx.comparative);
              let comp = docx.comparative
              tweetsArr.push({tweetText: tweetText, 
              comp: comp})
              //printing positive, negative, neutral
              // if(docx.comparative>0)
              //  console.log("positive");
              // else if(docx.comparative<0)
              //  console.log("negative");
              // else
              //  console.log("neutral");

           }//for each tweet

          if(tweetsArr.length>0){
            res.status(200).json(tweetsArr)
         } else{
           res.status(404).json({
             message: "error/..."
           })
         }
      }//!err
      else{
          console.log(err);
          res.status(404).json({
            message: "error/..."
          })
      }
  })
});


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
