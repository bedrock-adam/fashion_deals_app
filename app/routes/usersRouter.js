var path = require('path'),
    usersController = require(path.join(__dirname, '..', 'controllers', 'usersController'));

module.exports = function(router) {
  router.route('/users/new')
    .get(usersController.new);

  router.route('/users')
    .post(usersController.create);

  return router;
};
