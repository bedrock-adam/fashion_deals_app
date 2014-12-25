DealCollection = require('../models/dealCollection');

module.exports = function(App, Backbone) {
  var dealCollection = new (DealCollection(App, Backbone));

  dealCollection.add({
    id: 1,
    title: "The Iconic - 50% off Mens shirts",
    description: "Limited time only. Includes house brands only."
  });

  dealCollection.add({
    id: 2,
    title: "Asos - 25% off Womens lingere",
    description: "Valid till 1/1/2015. Excludes Kookai & Tsubi."
  });

  App.reqres.setHandler('deal:collection', function() {
    return dealCollection;
  });
}
