var DealShowCommand = require('./dealShowCommand'),
    DealFormCommand = require('./dealFormCommand'),
    DealTableCommand = require('./dealTableCommand');

module.exports = function(App, Backbone) {
  DealShowCommand(App, Backbone);
  DealFormCommand(App, Backbone);
  DealTableCommand(App, Backbone);
}
