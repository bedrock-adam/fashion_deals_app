var path = require('path');

module.exports = function(db) {
  return {
    dealsController: require(path.join(__dirname, 'dealsController')(db))
  };
};
