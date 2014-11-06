var User = require('../../app/models/user');
var expect = require('expect.js');

describe('User', function() {
  describe('#authenticate', function() {
    it('returns authenticated user', function(done) {
      var username = 'Adam';
      var password = 'thisisatest';

      var attrs = {
        username: username,
        email: 'adam@test.com',
        password: password
      };

      User.create(attrs, function(err, user) {
        expect(err).to.be(null);

        User.authenticate(username, password, function(res, user) {
          expect(err).to.be(null);

          expect(user).to.be.ok;

          done();
        });
      });
    });
  });
});
