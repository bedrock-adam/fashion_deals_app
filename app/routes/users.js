var users = require('../controllers/users');

module.exports = function(router) {
  router.route('/users/new')
    .get(users.new);

  router.route('/users')
    .post(users.create);

  return router;
};
