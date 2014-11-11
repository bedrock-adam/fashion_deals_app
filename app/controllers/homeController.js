module.exports = function(router, io, db) {
  var Deal = db.Deal;

  return {
    index: function(req, res) {
      Deal.find({}, function(err, deals) {
        if (err) return next(err);

        res.render('home/index', { deals: deals });
      });
    }
  };
};
