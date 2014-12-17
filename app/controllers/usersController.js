var path = require('path'),
    _ = require('lodash');

module.exports = function(db) {
  var User = db.User;

  return {
    new: function(req, res) {
      var user = new User();

      res.render('users/new', { user: user } );
    },
    create: function(req, res) {
      var userAttrs = _.cloneDeep(req.body.user);
      var user = new User(userAttrs);

      user.save(function(err) {
        if (err) return res.render('users/new', { user: user, err: err });

        req.flash('info', 'Welcome, ' + user.username);
        res.redirect('/');
      });
    }
  };
};
