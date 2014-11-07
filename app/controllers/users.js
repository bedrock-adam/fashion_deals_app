var User = require('../models/user.js');

exports.new = function(req, res) {
  var user = new User();

  // res.render('users/new', { user: user, csrfToken: req.csrfToken() } );
  res.render('users/new', { user: user } );
};

exports.create = function(req, res) {
  User.create(req.body.user).then(function(deal) {
    res.redirect('/');
  }, function(err) {
    res.send(err.message);
  });
};
