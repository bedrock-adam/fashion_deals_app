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

App.on('start', function(options){
  Backbone.history.start();
});

var DealsModule = require('./deals/module.js')(App, Backbone);

App.start();
