 var _ = require('lodash');

module.exports = function(app, io, db) {
  var dealsIo = io.of('/deals'),
      Deal = db.Deal;

  return {
    index: function(req, res) {
      Deal.find({}, function(err, deals) {
        if (err) return next(err);

        res.render('deals/index', { deals: deals });
      });
    },
    show: function(req, res) {
      var deal = req.deal;

      res.render('deals/show', { deal: deal });
    },
    new: function(req, res) {
      var deal = new Deal();

      res.render('deals/new', { deal: deal });
    },
    create: function(req, res) {
      var dealAttrs = _.cloneDeep(req.body.deal);
      var deal = new Deal(dealAttrs);
      deal.userId = req.user.id;

      deal.save(function(err) {
        if (err) return res.render('deals/new', { deal: deal, errors: err.errors });

        dealsIo.emit('create', deal.toJSON());
        req.flash('info', 'Deal succesfully created.');

        res.redirect('/deals/' + deal.id);
      });
    },
    edit: function(req, res) {
      res.render('deals/edit', { deal: req.deal });
    },
    update: function(req, res) {
      var deal = req.deal;
      var dealAttrs = _.cloneDeep(req.body.deal);

      _.extend(deal, dealAttrs);

      deal.save(function(err) {
        if (err) return res.render('deals/edit', { deal: deal, errors: err.errors });

        dealsIo.emit('update', deal.toJSON());
        req.flash('info', 'Deal succesfully updated.');

        res.redirect('/deals/' + deal._id);
      });
    },
    destroy: function(req, res) {
      var deal = req.deal;

      deal.remove(function(err) {
        if (err) return next(err);

        // dealsIo.emit('destroy', deal.toJSON());
        req.flash('info', 'Deal succesfully removed.');

        res.redirect('/deals');
      });
    },
    dealById: function(req, res, next, id) {
      Deal.findById(id, function(err, deal) {
        if (err) return next(err);

        req.deal = deal;

        next();
      });
    }
  };
};
