var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config');

const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');

var app = express();

MongoClient.connect(`mongodb://${config.dbHost}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(config.dbName);
    const collection = db.collection(config.dbCollection); 
    db.collection(config.dbCollectionRooms).createIndex({"room": 1}, {unique:true});
    const collectionRooms = db.collection(config.dbCollectionRooms); 
    app.locals[config.dbCollection] = collection;
    app.locals[config.dbCollectionRooms] = collectionRooms;
  })
  .catch(error => {
    console.log(error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
});

app.use((req, res, next) => {
  const collectionRooms = req.app.locals[config.dbCollectionRooms];
  req.collectionRooms = collectionRooms;
  next();
});

app.use('/appointments', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

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