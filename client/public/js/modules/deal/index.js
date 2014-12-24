var DealCommands = require('./commands')

module.exports = function(App, Backbone) {
  DealCommands(App, Backbone);

  // var DealsController = require('./deals/controllers/dealsController'),
  //     DealsRouter = require('./deals/controllers/dealsRouter');

  // App.on('start', function(options) {
  //   var dealsController = new DealsController;

  //   var dealsRouter = new DealsRouter({ controller: dealsController });
  // }
}
