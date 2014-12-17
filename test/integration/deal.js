var path = require('path'),
    request = require('supertest'),
    fs = require('fs'),
    env = require(path.join(__dirname, '..', '..', 'config', 'environment')),
    app = require(path.join(__dirname, '..', '..', 'app'))(env);

describe('POST /api/deals', function() {
  it('respond with success', function(done) {
    var fixturePath = path.join(__dirname, '..', 'fixtures', 'deal.json');

    fs.readFile(fixturePath, 'ascii', function(err, data) {
      if (err) return done(err);

      var dealAttrs = JSON.parse(data);

      request(app)
        .post('/api/deals')
        .set('Content-Type', 'application/json')
        .send(dealAttrs)
        .expect(200, done)
    });
  });
});

describe('GET /api/deals', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/deals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
