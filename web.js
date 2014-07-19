var express = require("express"),
    morgan  = require('morgan'),
    request = require('request'),
    cheerio = require('cheerio');

var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*")

  var uri = req.query.uri
  if (uri.substring(0,3) !== "http")
    uri = "http://" + uri;

  request({uri : uri}, function(error, response, body) {
    if (!error && response.statusCode === 200)
    {
      var parsedDocument = cheerio.load(body);

      var result = {
        title: parsedDocument("meta[name='twitter:text:main_song_title']").attr("content"),
        artist: parsedDocument("meta[name='twitter:text:main_song_artist']").attr("content"),
        image: parsedDocument("meta[name='twitter:image:song_thumbnail_img']").attr("content")
      }

      res.send(result);
    }
    else
    {
      res.send({})
    }
  });
});

app.options('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.end('');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
