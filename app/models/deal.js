module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var DealSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    couponCode: {
      type: String
    },
    isAffiliated: {
      type: Boolean,
      default: false
    },
    startsAt: {
      type: Date,
    },
    endsAt: {
      type: Date
    },
    isFreebie: {
      type: Boolean,
      default: false
    },
    category: {
      type: String
    },
    tags: {
      type: Array
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    // comments: [dealCommentSchema]
  }, {
    strict: true
  });

  return mongoose.model('Deal', DealSchema);
};
