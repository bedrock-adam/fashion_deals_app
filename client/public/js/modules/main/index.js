module.exports = function(App, Backbone) {
  App.addRegions({
    header: "#container > header",
    nav: "#menu",
    main: "#container > main",
    footer: "#container > footer"
  });

  App.on('start', function(options) {
    var dealCollection = App.request('deal:collection');

    App.commands.execute('deal:table', dealCollection)
  });

  App.on('start', function(options) {
    Backbone.history.start();
  });
}
