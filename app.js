const express = require('express');
const app = express();

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const corredoresRouter = require('./routes/corredores')
app.use('/corredores',corredoresRouter)

module.exports = app;