var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DealSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: 'can not be blank'
  } //,
  // user_id: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // }
}, {
  strict: true
});

module.exports = mongoose.model('Deal', DealSchema);
