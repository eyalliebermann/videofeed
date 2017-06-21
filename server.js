const path = require('path');
const express = require('express');
const app = express();
const remote = require('./server/remote.js');
require('./server/api.js')(app);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use('/', express.static(path.join(__dirname, '../public/index.js')));
app.listen(app.get('port'), function () {
  console.log('Videofeed app listening!');
  console.log(`PORT:${app.get('port')}`);

});

// == Export our app ==
module.exports = app;