var home = require('../controllers/home');

module.exports = function(router) {
  router.route('/')
    .get(home.index);

  return router;
};
