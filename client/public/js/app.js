var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Marionette = require('backbone.marionette');

var App = new Marionette.Application();

App.addRegions({
  container: '#container'
});

var MainModule = require('./main/module.js');

App.addInitializer(function(options){
  var appLayoutView = new MainModule.AppLayoutView;

  App.getRegion('container').show(appLayoutView);
});

App.addInitializer(function(options){
  Backbone.history.start();
});

App.start();
