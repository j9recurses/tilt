// app/models/pill.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PillSchema   = new Schema({
  userid: String
  meds_at: Timestamp
  took_meds: Boolean
  lightreading: Integer
  gyroreading: String
  remind_at: Integer
});

module.exports = mongoose.model('Pill', PillSchema);
