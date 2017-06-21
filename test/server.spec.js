const request = require('supertest');
const app = require('../server')


describe('GET / statics', function () {
  it('/ responds with html', function (done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

 it('/index.html responds with html', function (done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

  it('/index.js responds with js', function (done) {
    request(app)
      .get('/index.js')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/javascript/)
      .expect(200, done);
  });

  it('/foo returns an error', function (done) {
    request(app)
      .get('/foo.html')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text\/html/)
      .expect(404, done);
  });

});