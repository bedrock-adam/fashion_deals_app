var _ = require('lodash');

module.exports = function(db) {
  var Deal = db.Deal;

  return {
    index: function(req, res) {
      Deal.find({}, function(err, deals) {
        if (err) return next(err);

        res.json(deals);
      });
    },
    show: function(req, res) {
      var deal = req.deal;

      res.json(deal);
    },
    create: function(req, res, next) {
      var dealAttrs = _.cloneDeep(req.body.deal);
      var deal = new Deal(dealAttrs);
      deal.userId = req.user._id;

      deal.save(function(err) {
        if (err) return res.status(400).send({errors: err.errors});

        res.json(deal);
      });
    },
    update: function(req, res) {
      var dealAttrs = _cloneDeep(req.body.deal);
      var deal = req.deal;

      _.extend(deal, dealAttrs);

      deal.save(function(err) {
        if (err) return res.status(400).send({error: err.errors});

        res.json(deal);
      });
    },
    destroy: function(req, res) {
      var deal = req.deal;

      deal.remove(function(err) {
        if (err) return res.status(400).send({error: err.errors});

        res.json(deal);
      });
    },
    findById: function(req, res, next, id) {
      Deal.findById(id, function(err, deal) {
        if (err) return next(err);

        req.deal = deal;

        next();
      });
    }
  };
};
