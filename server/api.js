const express = require('express');
const app = express();
const remote = require('./remote.js');

module.exports = function (app) {

  app.get('/api/v1.0/videos', function (req, res) {
    remote.fetchFeed((feed) => sendResponse(req, res, feed));
  });

  app.get('/api/v1.0/videos/filter-by/:source', function (req, res) {
    remote.fetchFeed((feed) => sendResponse(req, res, feed, req.params.source.toLowerCase()));
  });

  function sendResponse(req, res, feed, filter) {
    let filterVal = ['facebook', 'youtube', 'url'].find(allowedFilter => allowedFilter == filter);
    let filtered = filterVal ? feed.items.filter(item => item.source == filterVal) : feed.items;

    res.json({
      items: filtered
    });

  }
}