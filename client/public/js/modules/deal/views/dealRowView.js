module.exports = function(App, Backbone) {
  var DealRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',

    template: '#deal-row-template',

    ui: {
      showLink: 'a.show',
      editLink: 'a.edit',
      deleteLink: 'a.delete'
    },

    events: {
      'click @ui.showLink': 'show',
      'click @ui.editLink': 'edit',
      'click @ui.deleteLink': 'delete'
    },

    show: function(e) {
      App.commands.execute('deal:show', this.model)
    },

    edit: function(e) {
      App.commands.execute('deal:form', this.model)
    },

    delete: function(e) {
      var dealCollection = this.model.collection;

      this.model.destroy();

      App.commands.execute('deal:table', dealCollection)
    }
  });

  return DealRowView;
}
