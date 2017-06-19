const path = require('path');
const express = require('express');
const app = express();

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




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use('/', express.static(path.join(__dirname, 'public/index.js')));

app.get('/v1.0/videos', function (req, res) {
  res.json(VIDEOS);
});

app.get('/v1.0/videos/filter-by/:source', function (req, res) {

let filterVal = ['facebook','youtube','url'].find(allowedFilter=>allowedFilter==req.params.source.toLowerCase());
 let filtered =  filterVal? VIDEOS.items.filter(item=>item.source==filterVal):VIDEOS.items;
  res.json({items: filtered});
});

app.listen(app.get('port'), function () {
  console.log('Videofeed app listening!');
    console.log(`PORT:${app.get('port')}`);

});


// == Export our app ==
module.exports = app;
