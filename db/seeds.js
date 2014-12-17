var path = require('path'),
    env = require(path.join(__dirname, '..', 'config', 'environment')),
    db = require(path.join(__dirname, '..', 'app', 'models'))(env);

module.exports = function() {
  var res = db.Deal.remove().exec();

  res.then(function() {
    return db.User.remove().exec();
  })
  .then(function() {
    user = new db.User({
      username: 'Subskii',
      email: 'adammikulas@gmail.com',
      password: 'white'
    });

    return user.save().exec()
  });

  return res;
};
