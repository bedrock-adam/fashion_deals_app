var deals = require('../controllers/deals');

module.exports = function(router) {
  router.route('/deals/new')
    .get(deals.new);

  router.route('/deals')
    .get(deals.index)
    .post(deals.create);

  router.route('/deals/:dealId')
    .get(deals.show)
    .put(deals.update)
    .delete(deals.destroy);

  router.route('/deals/:dealId/edit')
    .get(deals.edit);

  router.param('dealId', deals.dealById);

  return router;
};
