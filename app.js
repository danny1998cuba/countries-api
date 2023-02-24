var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var routers = require('./routes')
const middles = require('./middlewares')
const { swaggerDocs } = require('./swagger')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Router
app.use('/', routers.mainRouter);
// Countries routes
app.use('/api/:language/country', middles.language, routers.countriesRouter);
app.use('/api/country', routers.countriesRouter);
// COntinent routes
app.use('/api/:language/continent', middles.language, routers.continentRouter);
app.use('/api/continent', routers.continentRouter);
// Languages route
app.use('/api/:language/language', middles.language, routers.languageRouter);
app.use('/api/language', routers.languageRouter);

swaggerDocs(app, process.env.PORT)

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

module.exports = app;
