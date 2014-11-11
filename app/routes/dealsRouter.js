var path = require('path');

module.exports = function(router, io, db) {
  var dealsController = require(path.join(__dirname, '..', 'controllers', 'dealsController'))(app, io, db);

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
