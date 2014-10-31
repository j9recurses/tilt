// app/models/reminderjs

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReminderSchema   = new Schema({
  'userid': String,
  'rdate': Date,
  'rhour' : String
});

module.exports = mongoose.model('Reminder', ReminderSchema);


