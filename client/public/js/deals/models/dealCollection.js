module.exports = function(App, Backbone) {
  var DealModel = require('./dealModel')(App, Backbone);

  var DealCollection = Backbone.Collection.extend({
    model: DealModel,

    localStorage: new Backbone.LocalStorage('FashionDealsApp')
  });

  return DealCollection;
}
