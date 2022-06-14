var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requerir Database
const db = require('./database/models');

var indexRouter = require('./routes/index');
const productRouters = require('./routes/products');     //Nueva ruta
const userRouter = require('./routes/user');     //Nueva ruta
//const profileRouter = require('./routes/users');     Nueva ruta
const session = require('express-session');

<<<<<<< HEAD

=======
>>>>>>> e02ac34d1a9077b587ce76d23f8652f290829af0
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Listeners
app.use('/', indexRouter);
app.use('/product', productRouters);     //Ruta nueva
app.use('/user', userRouter);     //Ruta nueva
app.use(session({
  secret : 'myApp',
  resave : false,
  saveUninitialized : true
}));


/* Middleware de session */
app.use(function(req, res, next) {
  if ( req.session.user != undefined) {
    res.locals.user = req.session.user;
    return next()
  }
  return next();
});


/* creando el middleware de cookies .*/
app.use(function(req, res, next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
      let idUsuario = req.cookies.userId;

      db.User.findByPk(idUsuario)
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
  
});


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
