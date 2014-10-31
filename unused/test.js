var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var tilt = new five.Sensor.Digital(7);
  var tilt2 = new five.Sensor.Digital(6);

  tilt.on("change", function() {
    if (this.value) {
      console.log("TILT!");
    }
  });

   tilt2.on("change", function() {
    if (this.value) {
      console.log("TILT2!");
    }
  });
});
