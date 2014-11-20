module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var dealCommentSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
  });

  return mongoose.model('DealComment', DealCommentSchema);
};
