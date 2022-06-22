var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')

// Requerir Database
const db = require('./database/models');

var indexRouter = require('./routes/index');
const productRouters = require('./routes/products');  
const userRouter = require('./routes/user');   

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configurar el session
app.use(session({
  secret: 'myApp',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
    return next();
  } 
  return next();
})

//Middleware de Cookies.
app.use(function(req, res, next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {

    let idUsuarioEnCookie = req.cookies.userId;
    db.User.findByPk(idUsuarioEnCookie)
    .then((user) => {
      req.session.user = user.dataValues;
      res.locals.user = user.dataValues;
      return next();
    }).catch((err) => {
      console.log(err);
    });
  } else {
    return next();
  }
})

//Listeners
app.use('/', indexRouter);
app.use('/product', productRouters); 
app.use('/user', userRouter);     

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
