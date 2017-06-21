//This component exposes the videos api
//It is versioned so that future apis can filter by more options
//the filter-by path is tumbler like, and is simplistic
//Filtering by multiple criteria might be better achieved with a query string


const express = require('express');
const app = express();
const remote = require('./remote.js');

module.exports = function (app) {

//All videos
  app.get('/api/v1.0/videos', function (req, res) {
    remote.fetchFeed((feed) => sendResponse(req, res, feed));
  });

//Filter-by
  app.get('/api/v1.0/videos/filter-by/:source', function (req, res) {
    remote.fetchFeed((feed) => sendResponse(req, res, feed, req.params.source.toLowerCase()));
  });

  function sendResponse(req, res, feed, filter) {
    let filterVal = ['facebook', 'youtube', 'url'].find(allowedFilter => allowedFilter === filter);
    let filtered = filterVal ? feed.items.filter(item => item.source === filterVal) : feed.items;    //Wrong filter means no filter


    res.json({
      items: filtered
    });

  }
}