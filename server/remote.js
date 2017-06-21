const axios = require('axios');

exports.fetchFeed = function (success){
   axios.get('https://cdn.playbuzz.com/content/feed/items')
  .then(function (response) {
  //console.log(response.data);
    success( response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

}