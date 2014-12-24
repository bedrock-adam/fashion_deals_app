module.exports = function(App, Backbone) {
  var DealFormView = Backbone.Marionette.ItemView.extend({
    tagName: 'form',

    template: '#deal-form-template',

    ui: {
      cancelButton: 'input.cancel'
    },

    events: {
      'submit': 'submit',
      'click @ui.cancelButton': 'cancel'
    },

    submit: function(e) {
      e.preventDefault();

      var data = Backbone.Syphon.serialize(this);
      this.model.set(data);

      this.model.save();

      App.commands.execute('deal:show', this.model)
    },

    cancel: function(e) {
      App.commands.execute('deal:show', this.model)
    }
  });

  return DealFormView;
}
