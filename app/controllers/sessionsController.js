module.exports = function() {
  return {
    new: function(req, res) {
      res.render('sessions/new');
    },
    create: function(req, res) {
      res.redirect('/');
    }
  };
};
