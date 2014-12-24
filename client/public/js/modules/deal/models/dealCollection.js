var DealModel = require('./dealModel');

module.exports = function(App, Backbone) {
  var DealCollection = Backbone.Collection.extend({
    model: DealModel(App, Backbone),

    localStorage: new Backbone.LocalStorage('FashionDealsApp')
  });

  return DealCollection;
}
