var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');
Backbone.Syphon = require('backbone.syphon');
Backbone.Marionette = require('backbone.marionette');

var App = new Backbone.Marionette.Application();

require('./modules/deal')(App, Backbone);
require('./modules/main')(App, Backbone);

App.start();
