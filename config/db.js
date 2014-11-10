var debug = require('debug')('db'),
    path = require('path'),
    mongoose = require('mongoose'),
    env = require(path.join(__dirname, 'environment'));

var mongodbUri = env.get('MONGODB_URI');

mongoose.connect(mongodbUri);

mongoose.connection.on('connected', function() {
  debug('Mongoose default connection open to ' + mongodbUri);

  if ('test' === env.get('NODE_ENV')) {
    debug('Test environment detected: dropping database');

    mongoose.connection.db.dropDatabase();
  }
});

mongoose.connection.on('error', function(err) {
  debug('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  debug('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = {
  User: require(path.join(__dirname, '..', 'app', 'models', 'user'))(mongoose),
  Deal: require(path.join(__dirname, '..', 'app', 'models', 'deal'))(mongoose)
};
