const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database!`);
});
mongoose.connection.once('open', function () {
    console.log('Mongoose Connection Successful!');
    mongoose.Promise = require('bluebird');
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

