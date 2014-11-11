var path = require('path');

module.exports = function(router, io, db) {
  var homeController = require(path.join('..', 'controllers', 'homeController'))(router, io, db);

  router.route('/')
    .get(homeController.index);

  return router;
};
