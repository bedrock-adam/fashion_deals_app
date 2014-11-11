var path = require('path'),
    _ = require('lodash'),
    db = require(path.join(__dirname, '..', '..', 'config', 'db'));

var User = db.User;

exports.new = function(req, res) {
  var user = new User();

  res.render('users/new', { user: user } );
};

exports.create = function(req, res) {
  var userAttrs = _.cloneDeep(req.body.user);
  var user = new User(userAttrs);

  user.save(function(err) {
    if (err) return res.render('users/new', { user: user, errors: err.errors });

    req.flash('info', 'Registration successful');
    res.redirect('/');
  });
};
