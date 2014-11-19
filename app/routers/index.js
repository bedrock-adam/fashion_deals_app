var path = require('path');

module.exports = function() {
  return {
    homeRouter: require(path.join(__dirname, 'homeRouter')),
    dealsRouter: require(path.join(__dirname, 'dealsRouter')),
    usersRouter: require(path.join(__dirname, 'usersRouter')),
    sessionsRouter: require(path.join(__dirname, 'sessionsRouter')),

    dealsApiRouter: require(path.join(__dirname, 'dealsApiRouter'))
  };
};
