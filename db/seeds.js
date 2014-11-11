var path = require('path'),
    db = require(path.join(__dirname, '..', 'config', 'db')),
    User = db.User;

module.exports = function(cb) {
  User.remove({}, function(err) {
    if (err) return cb(err);

    user = new User({
      username: 'Subskii',
      email: 'adammikulas@gmail.com',
      password: 'white'
    });

    user.save(function(err) {
      if (err) return cb(err);

      cb(null, null);
    });
  });
}
