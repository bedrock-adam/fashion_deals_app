module.exports = function(router, controller) {
  router.route('/sessions/new')
    .get(controller.new);

  // router.route('/sessions')
  //   .post(controller.create);

  return router;
};
