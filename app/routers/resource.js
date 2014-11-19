module.exports = function(resource, router, controller) {
  router.route('/' + resource + '/new')
    .get(controller.new);

  router.route('/' + resource)
    .get(controller.index)
    .post(controller.create);

  router.route('/' + resource + '/:' + resource + 'Id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy);

  router.route('/' + resource + '/:' + resource + '/edit')
    .get(controller.edit);

  router.param(resource + 'Id', controller.byId);

  return router;
}
