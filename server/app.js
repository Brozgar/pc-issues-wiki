const express = require('express');
const path = require('path');
const logger = require('morgan');
const wikiRouter = require('./routes/wiki.route');

const app = express();

console.log(`Worker ${process.pid} started`);

require('./config/mongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/wiki', wikiRouter);

module.exports = app;
