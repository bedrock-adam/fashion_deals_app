var Deal = require('../models/deal.js');

exports.index = function(req, res) {
  Deal.find().exec().then(function(deals) {
    res.render('deals/index', { deals: deals });
  }, function(err) {
    res.send(err.message);
  });
};

exports.show = function(req, res) {
  res.render('deals/show', { deal: req.deal });
};

exports.new = function(req, res) {
  var deal = new Deal();

  res.render('deals/new', { deal: deal });
};

exports.create = function(req, res) {
  Deal.create(req.body.deal).then(function(deal) {
    res.redirect('/deals/' + deal.id);
  }, function(err) {
    res.send(err.message);
  });
};

exports.edit = function(req, res) {
  res.render('deals/edit', { deal: req.deal });
};

exports.update = function(req, res) {
  req.deal.update(req.body.deal).exec().then(function(deal) {
    res.redirect('/deals/' + req.deal.id);
  }, function(err) {
    res.send(err.message);
  });

};

exports.destroy = function(req, res) {
  req.deal.remove().exec().then(function() {
    res.redirect('/deals');
  }, function(err) {
    res.send(err.message);
  });
};

exports.dealById = function(req, res, next, id) {
  Deal.findById(id).exec().then(function(deal) {
    req.deal = deal;

    next();
  }, function(err) {
    res.send(err.message);
  });
};
