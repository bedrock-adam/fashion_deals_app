var path = require('path'),
    sessionsController = require(path.join('..', 'controllers', 'sessionsController'));

module.exports = function(router) {
  router.route('/sessions/new')
    .get(sessionsController.new);

  // router.route('/sessions')
  //   .post(sessionsController.create);

  return router;
};
