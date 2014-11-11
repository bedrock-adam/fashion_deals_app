var path = require('path'),
    db = require(path.join(__dirname, '..', '..', '..', 'config', 'db')),
    Deal = db.Deal;

exports.index = function(req, res) {
  Deal.find({}, function(err, deals) {
    if (err) return next(err);

    res.json(deals);
  });
};

// module.exports = {
//   index: function(req, res) {
//     Deal.find({}, function(err, deals) {
//       if (err) return next(err);

//       res.json(users);
//     });
//   }//,
//   // show: function() {

//   // },
//   // new: function() {

//   // },
//   // create: function() {

//   // },
//   // edit: function() {

//   // },
//   // update: function() {

//   // },
//   // destroy: function() {

//   // }
// };
