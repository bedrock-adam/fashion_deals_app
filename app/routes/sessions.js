var sessions = require('../controllers/sessions');

module.exports = function(router) {
  router.route('/sessions/new')
    .get(sessions.new);

  router.route('/sessions')
    .post(sessions.create);

  return router;
};
