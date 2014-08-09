var express = require("express"),
    morgan  = require('morgan'),
    bopper  = require('./bopper')


var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*")

  var uri = req.query.uri

  var artist = req.query.artist
  var song = req.query.song

  // if nothing is set, send an empty result
  if (!uri && !artist && !song) {
    res.send({});
    return;
  }

  var cb = function(err, result) {
    if (!err)
      res.send(result)
    else
      res.send({})
  };

  if (uri)
    bopper.getByURI(uri, cb);
   else
    bopper.getByArtistSong(artist, song, cb)
});

app.options('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.end('');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
