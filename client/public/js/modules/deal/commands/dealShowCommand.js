module.exports = function(App, Backbone) {
  var DealShowView = require('../views/dealShowView')(App, Backbone);

  App.commands.setHandler('deal:show', function(dealModel) {
    var dealShowView = new DealShowView({ model: dealModel });

    App.getRegion('main').show(dealShowView);
  });
}
