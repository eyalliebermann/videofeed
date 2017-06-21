const request = require('supertest');
const app = require('../server')
const nock = require('nock');


var FEED =
{
  "items": [{
      "title": "Be a winner!",
      "type": "video",
      "source": "youtube",
      "videoId": "I33u_EHLI3w",
      "views": 12451409
    },
    {
      "title": "How to prepare a great beer",
      "type": "video",
      "source": "facebook",
      "videoId": "1052114818157758",
      "views": 4569654
    },
    {
      "type": "video",
      "source": "url",
      "url": "http://cdn.playbuzz.com/content/feed/video-1.mp4",
      "views": 8820
    },
    {
      "title": "Top 10 fastest cars in the world",
      "type": "video",
      "source": "youtube",
      "videoId": "h8MbhS5XKow",
      "views": 25560867
    },
    {
      "title": "A funny dog barking",
      "type": "video",
      "source": "youtube",
      "videoId": "MveqXxB12YA",
      "views": 4287171
    }
  ]
};

var playbuzz = nock('https://cdn.playbuzz.com/')
                .get('/content/feed/items')
                .times(999)
                .reply(200, FEED);


describe('GET videos', function () {
  it('respond with json', function (done) {
    request(app)
      .get('/api/v1.0/videos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with bogus filter as usual', function (done) {
    request(app)
      .get('/api/v1.0/videos/filter-by/foo')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});