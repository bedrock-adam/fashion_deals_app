var path = require('path');

module.exports = function(router, controller) {
  router.route('/users/new')
    .get(controller.new);

  router.route('/users')
    .post(controller.create);

  return router;
};
