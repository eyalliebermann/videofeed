const path = require('path');
const express = require('express')
const app = express()


app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname, 'public/index.js')));

app.get('/v1.0/videos', function (req, res) {
  res.json(VIDEOS);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

const VIDEOS = {
  "items": [
    {
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


