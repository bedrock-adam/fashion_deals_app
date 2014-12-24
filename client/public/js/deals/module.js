module.exports = function(App, Backbone) {

  var DealShowView = Backbone.Marionette.ItemView.extend({
    tagName: 'article',

    template: '#deal-show-template',

    model: DealModel,

    ui: {
      editLink: 'a.edit',
      deleteLink: 'a.delete'
    },

    events: {
      'click @ui.editLink': 'edit',
      'click @ui.deleteLink': 'delete'
    },

    edit: function() {
      var dealFormView = new DealFormView({
        model: this.model
      });

      App.getRegion('main').show(dealFormView);
    },

    delete: function() {
      var dealTableView = new DealTableView({
        collection: dealCollection
      });

      App.getRegion('main').show(dealTableView);
    }
  });

  var DealFormView = Backbone.Marionette.ItemView.extend({
    tagName: 'form',

    template: '#deal-form-template',

    model: DealModel,

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

      var dealShowView = new DealShowView({ model: this.model });

      App.getRegion('main').show(dealShowView);
    },

    cancel: function(e) {
      var dealShowView = new DealShowView({ model: this.model });

      App.getRegion('main').show(dealShowView);
    }
  });

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
      var dealShowView = new DealShowView({ model: this.model });

      App.getRegion('main').show(dealShowView);
    },

    edit: function(e) {
      var dealFormView = new DealFormView({ model: this.model });

      App.getRegion('main').show(dealFormView);
    },

    delete: function(e) {
      console.log('delete');

      this.model.destroy();

      var dealTableView = new DealTableView({
        collection: dealCollection
      });

      App.getRegion('main').show(dealTableView);
    }
  });

  var DealTableView = Backbone.Marionette.CompositeView.extend({
    tagName: 'table',

    template: '#deal-table-template',

    childView: DealRowView,

    childViewContainer: 'tbody',

    model: DealModel,

    collection: DealCollection
  });

  App.on('start', function(options) {
    var dealTableView = new DealTableView({
      collection: dealCollection
    });

    App.getRegion('main').show(dealTableView);
  });

  var DealModel = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'Untitled',
        description: 'No description provided.'
      }
    }
  });

  var dealModel1 = new DealModel({
    id: 1,
    title: "The Iconic - 50% off Mens shirts",
    description: "Limited time only. Includes house brands only."
  });

  var dealModel2 = new DealModel({
    id: 2,
    title: "Asos - 25% off Womens lingere",
    description: "Valid till 1/1/2015. Excludes Kookai & Tsubi."
  });

  var dealModel3 = new DealModel({
    id: 3
  });

  var DealCollection = Backbone.Collection.extend({
    model: DealModel,

    localStorage: new Backbone.LocalStorage('FashionDealsApp')
  });

  var dealCollection = new DealCollection;
  dealCollection.add([dealModel1, dealModel2, dealModel3]);

  var DealsController = Backbone.Marionette.Controller.extend({
    index: function() {
      App.getRegion('main').show(dealTableView);
    },
    show: function(id) {
      var dealShowView = new DealShowView({ model: dealModel });

      App.getRegion('main').show(dealShowView);
    },
    new: function() {
      var dealModel = new DealModel;
      var dealFormView = new DealFormView({ model: dealModel });

      App.getRegion('main').show(dealFormView);
    },
    edit: function(id) {
      var dealModel = dealCollection.find(function(deal) {
        return deal.id === parseInt(id);
      });

      var dealFormView = new DealFormView({ model: dealModel });

      App.getRegion('main').show(dealFormView);
    }
  });

  var DealsRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      '/deals': 'index',
      '/deals/:id': 'show',
      '/deals/new': 'new',
      '/deals/:id/edit': 'edit'
    }
  });

  App.on('start', function(options) {
    var dealsController = new DealsController;

    var dealsRouter = new DealsRouter({
      controller: dealsController
    });
  });
};
