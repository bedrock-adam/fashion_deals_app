exports.new = function(req, res) {
  res.render('sessions/new');
};

exports.create = function(req, res) {
  res.redirect('/');
};
