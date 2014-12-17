var path = require('path');

module.exports = function(db) {
  return {
    homeController: require(path.join(__dirname, 'homeController'))(db),
    dealsController: require(path.join(__dirname, 'dealsController'))(db),
    usersController: require(path.join(__dirname, 'usersController'))(db),
    sessionsController: require(path.join(__dirname, 'sessionsController'))(db),

    dealsApiController: require(path.join(__dirname, 'dealsApiController'))(db)
  }
}
