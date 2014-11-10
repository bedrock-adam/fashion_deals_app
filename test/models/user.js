var path = require('path'),
    db = require(path.join(__dirname, '..', '..', 'config', 'db')),
    expect = require('expect.js');

describe('User', function() {
  var User = db.User;

  describe('#authenticate', function() {
    var username = 'Adam1';
    var password = 'thisisatest';

    var userAttrs = {
      username: username,
      email: 'adam@test.com',
      password: password
    };

    var user = new User(userAttrs);

    context('correct credentials', function() {
      it('returns authenticated user', function(done) {
        user.save(function(err, user) {
          if (err) return done(err);

          User.authenticate(username, password, function(err, user) {
            if (err) return done(err);

            expect(user).to.be.ok;

            done();
          });
        });
      });
    });

    context('incorrect credentials', function() {
      it('passes an error', function(done) {
        user.save(function(err, user) {
          if (err) return done(err);

          User.authenticate(username, 'incorrect', function(err, user) {
            expect(err).to.be.an(Error);
            expect(err.message).to.equal('Invalid username or password')

            done();
          });
        });
      });
    });
  });
});
