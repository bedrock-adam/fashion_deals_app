var bodyParser = require('body-parser');

module.exports = function(router, controller) {
  router.use(bodyParser.urlencoded({
    extended: true
  }));

  router.route('/sessions/new')
    .get(controller.new);

  router.route('/sessions')
    .post(controller.create);

  return router;
};
