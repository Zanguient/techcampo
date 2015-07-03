
/**
 * Module dependencies.
 */

var express = require('express');
var load = require('express-load');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express)
var moment = require('moment');
var ejs = require('ejs');
var app = express();
var flash = require('express-flash')
var fs = require('fs');
var socketio = require('socket.io');
var url = require("url"); 
var SerialPort = require("serialport").SerialPort;
var socketServer;
var serialPort;
var portName = '/dev/ttyUSB0'; //change this to your Arduino port
var sendData = "";
crypter = require('./middleware/password_hash.js')

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('techcampo'));
app.use(express.session({
	secret: "techcampo",
	store: new mongoStore({
		url: "mongodb://localhost/techcampo",
		collection : 'sessions'
	})
}));
app.use(flash());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(crypter);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

load('models')
	.then('controllers')
	.then('routes')
	.into(app)

var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

initSocketIO(httpServer);


function initSocketIO(httpServer)
{
	socketServer = socketio.listen(httpServer);
    //console.log(socketServer);
	socketServer.on('connection', function (socket) {
        console.log("user connected");
        //console.log(socket);
        socket.emit('onconnection', {
            pollOneValue:sendData
        });
        socketServer.on('update', function(data) {
            socket.emit('updateData',{pollOneValue:data});
        });
        socket.on('buttonval', function(data) {
            serialPort.write(data + 'E');
        });
        socket.on('sliderval', function(data) {
            serialPort.write(data + 'P');
        });
	
    });
}

// Listen to serial port
function serialListener()
{
    //console.log("ronaldo1");
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });
 
    serialPort.on("open", function () {
      console.log('open serial communication');
            // Listens to incoming data
        serialPort.on('data', function(data) {
             receivedData += data.toString();
          if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
           sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
           receivedData = '';
           //console.log(sendData);
         }
         // send the incoming data to browser with websockets.
       socketServer.emit('update', sendData);
      });  
    });  
}
//Date Format
moment.locale('pt_BR');
ejs.filters.formatDate = function(date){
  return moment(date).format('DD/MMM/YYYY');
}

serialListener();
module.exports = app;
