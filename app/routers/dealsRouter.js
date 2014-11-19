var path = require('path');

module.exports = function(router, controller) {
  router.route('/deals/new')
    .get(controller.new);

  router.route('/deals')
    .get(controller.index)
    .post(controller.create);

  router.route('/deals/:dealId')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy);

  router.route('/deals/:dealId/edit')
    .get(controller.edit);

  router.param('dealId', controller.findById);

  return router;
};
