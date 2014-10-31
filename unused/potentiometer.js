
//before starting this up, need to upload this to the board: File > Examples > Firmata > StandardFirmata
var request = require('request');
var five = require("johnny-five"),
 //board, potentiometer;
 board, photoresistor;

console.log("in here");

board = new five.Board();

board.on("ready", function() {

  // Create a new `potentiometer` hardware instance.
  //potentiometer = new five.Sensor({
   // pin: "A0",
   // freq: 250
 // });


 photoresistor = new five.Sensor({
    pin: "A3",
    freq: 250
  });


  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    //pot: potentiometer
    pot: photoresistor
  });

  //potentiometer.on("data", function() {
  photoresistor.on("data", function() {
    var cool = this.value;
    console.log(cool);
    if (cool > 500){

      request.post(
       'http://localhost:8080/api/smartpills',
        { form: { userid: 'bobby', lightreading: cool } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body)
           }
      });
    }
  });






});


