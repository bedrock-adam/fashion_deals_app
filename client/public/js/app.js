var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');
Backbone.Syphon = require('backbone.syphon');
Backbone.Marionette = require('backbone.marionette');

var App = new Backbone.Marionette.Application();

App.addRegions({
  header: "#container > header",
  nav: "#menu",
  main: "#container > main",
  footer: "#container > footer"
});

var DealShowView = require('./deals/views/dealShowView')(App, Backbone);

App.commands.setHandler('deal:show', function(dealModel) {
  var dealShowView = new DealShowView({ model: dealModel });

  App.getRegion('main').show(dealShowView);
});

var DealFormView = require('./deals/views/dealFormView')(App, Backbone);

App.commands.setHandler('deal:form', function(dealModel) {
  var dealFormView = new DealFormView({ model: dealModel });

  App.getRegion('main').show(dealFormView);
});

var DealTableView = require('./deals/views/dealTableView')(App, Backbone);

App.commands.setHandler('deal:table', function(dealCollection) {
  var dealTableView = new DealTableView({ collection: dealCollection });

  App.getRegion('main').show(dealTableView);
});

var DealCollection = require('./deals/models/dealCollection')(App, Backbone);

App.on('start', function(options){
  var dealCollection = new DealCollection;

  dealCollection.add({
    id: 1,
    title: "The Iconic - 50% off Mens shirts",
    description: "Limited time only. Includes house brands only."
  });

  dealCollection.add({
    id: 2,
    title: "Asos - 25% off Womens lingere",
    description: "Valid till 1/1/2015. Excludes Kookai & Tsubi."
  });

  App.commands.execute('deal:table', dealCollection)
});

App.on('start', function(options) {
  Backbone.history.start();
});

// var DealsController = require('./deals/controllers/dealsController'),
//     DealsRouter = require('./deals/controllers/dealsRouter');

// App.on('start', function(options) {
//   var dealsController = new DealsController;

//   var dealsRouter = new DealsRouter({ controller: dealsController });
// }

App.start();
