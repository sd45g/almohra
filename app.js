var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const advertismentRouter = require('./routes/advertisment');
const reservationRoutes = require('./routes/reservationRoutes');
const DecorationsRoutes = require('./routes/Decorations');
const ReportsRoutes = require('./routes/report');
var app = express();
//middle ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// مش ضروري لان نبنوا في تطبيق مش موقع
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/advertisements', advertismentRouter);
app.use('/api/reservations', reservationRoutes);
app.use('/api/decorations', DecorationsRoutes);
app.use('/api/Reports', ReportsRoutes);



mongoose.connect(process.env.DB_URL)

module.exports = app;

app.use('/api/users', authRouter);



