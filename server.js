const path = require('path');
const express = require('express');
const app = express();
const remote = require('./server/remote.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use('/', express.static(path.join(__dirname, 'public/index.js')));

app.get('/v1.0/videos', function (req, res) {
  remote.fetchFeed((feed) => sendResponse(req, res, feed));

});

app.get('/v1.0/videos/filter-by/:source', function (req, res) {
  remote.fetchFeed((feed) => sendResponse(req, res, feed, req.params.source.toLowerCase()));
});

function sendResponse(req, res, feed, filter) {
  let filterVal = ['facebook', 'youtube', 'url'].find(allowedFilter => allowedFilter == filter);
  let filtered = filterVal ? feed.items.filter(item => item.source == filterVal) : feed.items;

  res.json({
    items: filtered
  });

}

app.listen(app.get('port'), function () {
  console.log('Videofeed app listening!');
  console.log(`PORT:${app.get('port')}`);

});


// == Export our app ==
module.exports = app;