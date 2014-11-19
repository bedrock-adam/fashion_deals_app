var path = require('path');

module.exports = function(router, controller) {
  router.route('/deals/new')
    .get(controller.authenticate, controller.new);

  router.route('/deals')
    .get(controller.index)
    .post(controller.authenticate, controller.create);

  router.route('/deals/:dealId')
    .get(controller.show)
    .put(controller.authenticate, controller.authorize, controller.update)
    .delete(controller.authenticate, controller.authorize, controller.destroy);

  router.route('/deals/:dealId/edit')
    .get(controller.authenticate, controller.authorize, controller.edit);

  router.param('dealId', controller.findById);

  return router;
};
