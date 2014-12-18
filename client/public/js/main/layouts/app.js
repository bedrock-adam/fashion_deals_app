var Marionette = require('backbone.marionette');

var AppLayoutView = Marionette.LayoutView.extend({
  template: "#layout-view-template",

  regions: {
    header: "header",
    nav: "#menu",
    main: "#main",
    footer: "footer"
  }
});

module.exports = AppLayoutView;
