var DealCommands = require('./commands')
var DealReqres = require('./reqres')

module.exports = function(App, Backbone) {
  DealCommands(App, Backbone);
  DealReqres(App, Backbone);

  // var DealsController = require('./deals/controllers/dealsController'),
  //     DealsRouter = require('./deals/controllers/dealsRouter');

  // App.on('start', function(options) {
  //   var dealsController = new DealsController;

  //   var dealsRouter = new DealsRouter({ controller: dealsController });
  // }
}
