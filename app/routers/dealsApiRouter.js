var path = require('path'),
    bodyParser = require('body-parser');

module.exports = function(router, controller) {
  router.use(bodyParser.json());

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
