var path = require('path'),
    mongoose = require('mongoose');
    env = require(path.join(Node.root, 'config', 'environment'));

module.exports = function() {
  return mongoose.connect(env.get('MONGODB_URI'));
};
