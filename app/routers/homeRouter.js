var bodyParser = require('body-parser');

module.exports = function(router, controller) {
  router.route('/')
    .get(controller.index);

  return router;
};
