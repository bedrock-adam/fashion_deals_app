var bodyParser = require('body-parser');

module.exports = function(router, controller) {
  router.use(bodyParser.urlencoded({
    extended: true
  }));

  router.route('/users/new')
    .get(controller.new);

  router.route('/users')
    .post(controller.create);

  return router;
};
