// app.js


// modules ===========================================
var express 	 = require('express');
var app 		 = express();

var path 		 = require('path');
var favicon 	 = require('serve-favicon');
var logger 		 = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser 	 = require('body-parser');

var ip			 = require('ip');
var validate	 = require('validator');

// routes ============================================

var routeIndex	= require('./routes/index');
var routeIp		= require('./routes/ip');

// config ============================================

var configApiUrl = process.env.API_URL;

//
//
//

// define a variable accessable to all views

app.set('apiUrl', configApiUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeIndex);
app.use('/ip', routeIp(validate));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
