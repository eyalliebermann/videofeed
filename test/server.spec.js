const request = require('supertest');
const app = require('../server')


describe('GET videos', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/v1.0/videos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});