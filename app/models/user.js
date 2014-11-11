var bcrypt = require('bcrypt'),
    ROUNDS = 10;

module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      index: { unique: true },
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      trim: true,
      lowercase: true
    },
    password_hash: {
      type: String,
      required: true
    },
  });

  UserSchema.virtual('password')
    .get(function() {
      return this._password;
    })
    .set(function(password) {
      return (this._password = password);
    });


  UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.id = doc.id,
      delete ret.__v;
      delete ret._id;
      delete ret.password_hash;
    }
  });

  UserSchema.pre('validate', function(next) {
    // if (!user.isModified('password')) return next();
    // if (!validatePresenceOf(this.password)) return next(new Error('Invalid Password'));

    var user = this;

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
    var normalizedUsername = username.trim().toLowerCase();

    this.findOne({ 'username': normalizedUsername }, function(err, user) {
      if (err) return cb(error);
      if (!user) return cb(new Error('User not found'));

      bcrypt.compare(password, user.password_hash, function(err, res) {
        if (err) return cb(err);
        if (!res) return cb(new Error('Invalid username or password'));

        cb(null, user);
      });
    });
  });

  return mongoose.model('User', UserSchema);
};
