var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    ROUNDS = 10;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  }
});

UserSchema.virtual('password')
  .get(function() {
    return this._password;
  })
  .set(function(password) {
    return (this._password = password);
  });

UserSchema.pre('validate', function(next) {
  var user = this;

  // if (!user.isModified('password')) return next();
  // if (!validatePresenceOf(this.password)) return next(new Error('Invalid Password'));

  bcrypt.genSalt(ROUNDS, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password_hash = hash;

      next();
    });
  });
});

UserSchema.static('authenticate', function(username, password, cb) {
  this.findOne({ 'username': username }).exec(function(err, user) {
    if (err) return cb(error);
    if (!user) return cb(new Error('User not found'));

    bcrypt.compare(password, user.password_hash, function(err, res) {
      if (err) return cb(err);

      return (res ? cb(null, user) : cb(null, null));
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
