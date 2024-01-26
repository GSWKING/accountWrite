var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 导包
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/web/index');
// var usersRouter = require('./routes/users');
var authRouter = require('./routes/web/auth');
var authApiRouter = require('./routes/api/auth');
var accountRouter = require('./routes/api/account');
var app = express();
let {DBHOST,DBPORT,DBNAME} = require('./config/config');
// view engine setup
// console.log(path.join(__dirname, 'views'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// console.log(a)

app.use(session({
  name:'sid',
  secret:'gsw',
  saveUninitialized:false,
  resave:true,
  store:MongoStore.create({
    mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie:{
    httpOnly:true,
    maxAge:1000 * 60 * 60 * 24 * 3
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render('404')
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
