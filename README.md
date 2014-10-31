This is the repo for Tilt, a smart pill container. 

To hook up the smart pill bottle to the web, preform the the following steps:

1.hook up the pill bottle to an arduino uno board.
2.Run the script, "node photo.js" ---> this node js script sends the data from ardruino to a webserver
3.Run the script, "node server.js" ---> this node js script fires up a node server, writes the sensor data to mongo db and also handles get and                                         post requests. 
