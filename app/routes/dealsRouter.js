var path = require('path'),
    dealsController = require(path.join(__dirname, '..', 'controllers', 'dealsController'));

module.exports = function(router) {
  router.route('/deals/new')
    .get(dealsController.new);

  router.route('/deals')
    .get(dealsController.index)
    .post(dealsController.create);

  router.route('/deals/:dealId')
    .get(dealsController.show)
    .put(dealsController.update)
    .delete(dealsController.destroy);

  router.route('/deals/:dealId/edit')
    .get(dealsController.edit);

  router.param('dealId', dealsController.dealById);

  return router;
};
