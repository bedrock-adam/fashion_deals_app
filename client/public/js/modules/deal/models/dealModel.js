module.exports = function(App, Backbone) {

  var DealModel = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'Untitled',
        description: 'No description provided.'
      }
    }
  });

  return DealModel;
}
