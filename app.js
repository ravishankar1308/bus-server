// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8085"
// };
//
// app.use(cors(corsOptions));

app.use(logger('dev'));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(async function () {
      await console.log("Successfully connect to MongoDB.");
      await initialRoles();

    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });

mongoose.set('useCreateIndex', true);


// simple route
app.get("/", async (req, res) => {
  res.json({message: "Welcome to Bus Booking application"});
});

// routes
require('./app/routes/user.routes')(app);
require('./app/routes/location.routes')(app);
require('./app/routes/bus.routes')(app);
require('./app/routes/trip.routes')(app);
require('./app/routes/ticket.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role =require('./app/models/role.model');

async function initialRoles() {
  await Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "conductor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'conductor' to roles collection");
      });

      new Role ({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

}
