module.exports = function(App, Backbone) {
  var DealRowView = require('./dealRowView')(App, Backbone);

  var DealTableView = Backbone.Marionette.CompositeView.extend({
    tagName: 'table',

    template: '#deal-table-template',

    childView: DealRowView,

    childViewContainer: 'tbody'
  });

  return DealTableView;
}
