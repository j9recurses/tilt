// app/models/pill.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PillSchema   = new Schema({
  'userid': String,
  'tookmeds': Number,
  'tookdate' : Date
});

module.exports = mongoose.model('Pill', PillSchema);


