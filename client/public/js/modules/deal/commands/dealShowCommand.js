module.exports = function(App, Backbone) {
  var DealShowView = require('../views/dealShowView')(App, Backbone);

  App.commands.setHandler('deal:show', function(dealModel) {
    Backbone.history.navigate('deals/' + dealModel.get('id'));

    var dealShowView = new DealShowView({ model: dealModel });

    App.getRegion('main').show(dealShowView);
  });
}
