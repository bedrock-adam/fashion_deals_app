var path = require('path'),
    dealsController = require(path.join(__dirname, '..', '..', 'controllers', 'api', 'dealsController'));

module.exports = function(router) {
  router.route('/api/deals')
    .get(dealsController.index);

  return router;
};
