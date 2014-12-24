module.exports = function(App, Backbone) {
  var DealTableView = require('../views/dealTableView')(App, Backbone);

  App.commands.setHandler('deal:table', function(dealCollection) {
    var dealTableView = new DealTableView({ collection: dealCollection });

    App.getRegion('main').show(dealTableView);
  });
}
