module.exports = function(App, Backbone) {
  var DealFormView = require('../views/dealFormView')(App, Backbone);

  App.commands.setHandler('deal:form', function(dealModel) {
    var dealFormView = new DealFormView({ model: dealModel });

    App.getRegion('main').show(dealFormView);
  });
}
