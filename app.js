var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');

var app = express();

// setup mongoose. not needed anymore, using json server instead.
/*var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('url');
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/

// not needed for this anymore
// var Item = require('./models/ItemsModel'); //same as calling mongoose.model('Item', ItemsSchema)

// view engine setup. not really needed but whatever
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router. doesn't do anything right now since we are serving the page as static file
//app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
