module.exports = function(App, Backbone) {
  var DealShowView = Backbone.Marionette.ItemView.extend({
    tagName: 'article',

    template: '#deal-show-template',

    ui: {
      editLink: 'a.edit',
      deleteLink: 'a.delete'
    },

    events: {
      'click @ui.editLink': 'edit',
      'click @ui.deleteLink': 'delete'
    },

    edit: function() {
      App.commands.execute('deal:form', this.model)
    },

    delete: function() {
      App.commands.execute('deal:table', dealCollection)
    }
  });

  return DealShowView;
}
