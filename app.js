
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

//Date Format
moment.locale('pt_BR');
ejs.filters.formatDate = function(date){
  return moment(date).format('DD/MMM/YYYY');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;