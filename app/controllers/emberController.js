module.exports = function(db) {
  return {
    index: function(req, res) {
      res.render('ember/index');
    }
  }
};
