module.exports = function(App, Backbone) {
  var DealFormView = require('../views/dealFormView')(App, Backbone);

  App.commands.setHandler('deal:form', function(dealModel) {
    Backbone.history.navigate('deals/' + dealModel.get('id') + '/edit');

    var dealFormView = new DealFormView({ model: dealModel });

    App.getRegion('main').show(dealFormView);
  });
}
