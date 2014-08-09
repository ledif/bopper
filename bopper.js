 var request = require('request'),
     cheerio = require('cheerio');

var getByURI = function(uri, cb) {
  // if the url doesn't have http, add it
  if (uri.lastIndexOf("http://", 0) !== 0)
    uri = "http://" + uri;

  request({uri : uri}, function(error, response, body) {
    if (!error && response.statusCode === 200)
    {
      var parsedDocument = cheerio.load(body);

      var result = {
        title: parsedDocument("meta[name='twitter:text:main_song_title']").attr("content"),
        artist: parsedDocument("meta[name='twitter:text:main_song_artist']").attr("content"),
        image: parsedDocument("meta[name='twitter:image:song_thumbnail_img']").attr("content"),
        uri: uri
      }

      cb(null, result)
    }
    // send empty result if document doesn't exist, or other http error
    else
    {
      cb(error, {})
    }
  });
}

var boppify = function(str) {
  str = str.toLowerCase();

  // replace & with and
  str = str.replace(/\&/g, "and")


  // replace stuff with hyphens
  str = str.replace(/ |\/|\\/g, "-")

  // get rid of everything that's not a hyphen, period, star or alphanumeric
  str = str.replace(/[^a-zA-Z0-9-.\*]/g, '')
  return str
}

var uriFromArtistSong = function(artist, song) {
  s = "http://bop.fm/s/" + boppify(artist) + "/" + boppify(song);
   console.log(s);
  return s
}

var getByArtistSong = function(artist, song, cb) {
  getByURI(uriFromArtistSong(artist, song), cb)
}

module.exports.getByURI = getByURI
module.exports.getByArtistSong = getByArtistSong
module.exports.boppify = boppify
module.exports.uriFromArtistSong = uriFromArtistSong
