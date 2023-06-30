var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require('fs');
var KiteConnect = require('kiteconnect').KiteConnect;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Kite
const token = require('./privateToken/token');
var api_key = token.API_KEY,
  secret = token.SECRET,
  request_token = token.REQUEST_TOKEN,
  access_token = '';
//https://kite.zerodha.com/connect/login?v=3&api_key=909lcbtyglf6ks4o
var options = {
  api_key: api_key,
  debug: false,
};
var InstrumentlabelINFY = 'NSE:NIFTY 50';

myinstruments = [InstrumentlabelINFY];
``;
let kc = new KiteConnect(options);

kc.setSessionExpiryHook(sessionHook);

function sessionHook() {
  console.log('User loggedout');
}

if (!access_token) {
  kc.generateSession(request_token, secret)
    .then(function (response) {
      console.log('Response is online', response);
      init();
    })
    .catch(function (err) {
      console.log(err);
    });
}
//Access code present
else {
  init();
}
function init() {
  timeinterval = 1000;
  var interval = setInterval(function () {
    console.log(myinstruments);
    kc.getLTP(myinstruments)
      .then(function (response) {
        console.log('response is done');
        console.log(response);
      })
      .catch((error) => {
        console.log('this is an error', error);
      });
  }, timeinterval);
}
//

module.exports = app;
