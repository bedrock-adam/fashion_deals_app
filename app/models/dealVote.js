module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var DealVoteSchema = new Schema({
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    }
  });

  return mongoose.model('DealVote', dealVoteSchema);
};
