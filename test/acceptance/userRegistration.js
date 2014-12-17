var path = require('path'),
    env = require(path.join(__dirname, '..', '..', 'config', 'environment')),
    app = require(path.join(__dirname, '..', '..', 'app'))(env),
    http = require('http'),
    Browser = require('zombie'),
    chai = require('chai');

var expect = chai.expect;

describe('user registration', function() {
  before(function() {
    Browser.localhost('fashiondealsapp.com', 3001);
    this.server = http.createServer(app).listen(3001);
  });

  it.skip('should accept complete submissions', function(done) {
    var browser = Browser.create({
      followRedirect: true,
      followAllRedirects: true
    });
    var username = 'tester';

    browser.visit('/users/new')
      .then(function() {
        browser.fill('user[username]', username);
        browser.fill('user[email]', 'tester@testing.com');
        browser.fill('user[password]', 'test123');

        return browser.pressButton('Register');
      })
      .done(function() {
        browser.assert.url({ pathname: '/'})
        browser.assert.text('.info', 'Welcome to Fashion Deals App, ' + username);
      });
  });

  after(function(done) {
    this.server.close(done);
  });
});
