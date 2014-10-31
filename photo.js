var five = require("johnny-five"), board, photoresistor, tiltsensor;
var request = require('request');
board = new five.Board();

board.on("ready", function() {
    var tilt = new five.Sensor.Digital(7);
    var tilt2 = new five.Sensor.Digital(6);

    // Create a new `photoresistor` hardware instance.
    photoresistor = new five.Sensor({
        pin: "A3",
        freq: 250
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: photoresistor,
    });

    // Declare Variables
    var currentTilt = 0;

    function photoResistorProcess(val) {
        lightSensor = val;
        checkPhotoTiltCoincidence(lightSensor)
    }

    function tiltProcess(val) {
        currentTilt = val;
    }



    function checkPhotoTiltCoincidence(lightSensor) {
        if (lightSensor > 100  && currentTilt > 0) {
            console.log('Took Pill!');
            timest = new Date()
            request.post(
                  'http://localhost:8080/api/smartpills',
                  { form: { userid: 'Jack', tookmeds: 1, tookdate:timest  } },
                  function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                              console.log(body)
                        }
                  });
            return true;
        }
    }

    photoresistor.on("data", function() {
        photoResistorProcess(this.value);
    });

    tilt.on("data", function() {
        tiltProcess(this.value)
    });


});
