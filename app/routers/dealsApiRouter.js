var path = require('path');

module.exports = function(router, controller) {
  router.route('/deals')
    .get(controller.index)
    .post(controller.create);

  router.route('/deals/:dealId')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy);

  router.param('dealId', controller.findById);

  return router;
};
