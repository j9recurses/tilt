// server.js

// BASE SETUP
// =================set up the server============================================================

// call the packages we need
var express    = require('express');    // call express
var path = require('path');  //path for web app
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

//set up the mongo db connection
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://localhost/test');
var Pill     = require('/home/j9/Desktop/fall_2014/human_sensors/pills/models/pill.js');
var Reminder     = require('/home/j9/Desktop/fall_2014/human_sensors/pills/models/reminder.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var port = process.env.PORT || 8080;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router


router.route('/reminder')
    .get(function(req, res) {
    res.render('reminder', { title: 'Set a Reminder Time' });
   })

    .post(function(req, res) {
    var reminder = new Reminder();    // create a new instance of the pill mongo model
    reminder.userid = req.body.userid;  // set the bears name (comes from the request)
    reminder.rdate=  req.body.ddate;
    reminder.rhour  = req.body.rhour;
    reminder.save(function(err) {
      if (err)
        console.log(err);
    res.json({ message: 'Reminder created!' });
    });
  });


////----get reminder records for a user_id
// on routes that end in /reminder/:userid
// ----------------------------------------------------
router.route('/reminder/:userid')
  // get the pills with that id (accessed at GET http://localhost:8080/api/reminder/:userid)
  .get(function(req, res) {
    console.log(req.params.userid)
    Reminder.find({userid: req.params.userid}, function(err, reminder) {
          if (err)
                res.send(err);
          res.json(reminder);
            });
  })

  ///delete specific users data - accessed at DELETE http://localhost:8080/api/reminder/:userid)
  .delete(function(req, res) {
    Reminder.remove({userid: req.params.userid }, function(err, reminder) {
      if (err)
        res.send(err);
      res.json({ message: 'User data successfully deleted' });
    });
  });



// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /pills---> get and post requests
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.route('/smartpills')


///------------post-----------------------
  // create a pill (accessed at POST http://localhost:8080/api/smartpills)
  .post(function(req, res) {
    var pill = new Pill();    // create a new instance of the pill mongo model
    pill.userid = req.body.userid;  // set the pills userid name (comes from the request)
    pill.tookmeds=  req.body.tookmeds;
    pill.tookdate  = req.body.tookdate;
    console.log(req.body);
    // save the bear and check for errors
    pill.save(function(err) {
      if (err)
        console.log(err);
      res.json({ message: 'Pill reading created!' });
    });
  })


//-------------get--------------------------------------
// get all the pills (accessed at GET http://localhost:8080/api/smartpills)
  .get(function(req, res) {
    Pill.find(function(err, pills) {
      if (err)
        res.send(err);
      res.json(pills);
    });
  });


////----get records for a user_id
// on routes that end in /pills/:userid
// ----------------------------------------------------
router.route('/smartpills/:userid')
  // get the pills with that id (accessed at GET http://localhost:8080/api/smartpills/:userid)
  .get(function(req, res) {
    Pill.find({userid: req.params.userid}, function(err, pill) {
          if (err)
                res.send(err);
          res.json(pill);
            });
  })

///delete specific users data - accessed at DELETE http://localhost:8080/api/smartpills/:userid)
  .delete(function(req, res) {
    Pill.remove({userid: req.params.userid }, function(err, pill) {
      if (err)
        res.send(err);
      res.json({ message: 'User data successfully deleted' });
    });
  });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/reminder', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
