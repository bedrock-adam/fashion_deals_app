var path = require('path'),
    homeController = require(path.join('..', 'controllers', 'homeController'));

module.exports = function(router) {
  router.route('/')
    .get(homeController.index);

  return router;
};
