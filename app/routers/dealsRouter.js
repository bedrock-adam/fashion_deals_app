var path = require('path'),
    bodyParser = require('body-parser'),
    csrf = require('csurf');

module.exports = function(router, controller) {
  router.use(bodyParser.urlencoded({
    extended: true
  }));

  // router.use(csrf({cookie: true}));

  // router.use(function(req, res, next) {
  //   res.locals.csrfToken = req.csrfToken();
  //   next();
  // });

  router.route('/deals/new')
    .get(controller.authenticate, controller.new);

  router.route('/deals')
    .get(controller.index)
    .post(controller.authenticate, controller.create);

  router.route('/deals/:id')
    .get(controller.show)
    .put(controller.authenticate, controller.authorize, controller.update)
    .delete(controller.authenticate, controller.authorize, controller.destroy);

  router.route('/deals/:id/edit')
    .get(controller.authenticate, controller.authorize, controller.edit);

  router.param('id', controller.findById);

  return router;
};
