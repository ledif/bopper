 var request = require('request'),
     cheerio = require('cheerio');

if (!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
} 

var parseTitle = function(str) {
  var explode = str.split("|");

  return {
    title: explode[0].trim(),
    artist: explode[1].trim(),
  }
}

var getByURI = function(uri, cb) {
  // if the url doesn't have http, add it
  if (uri.lastIndexOf("http://", 0) !== 0)
    uri = "http://" + uri;

  request({uri : uri}, function(error, response, body) {
    if (!error && response.statusCode === 200)
    {
      var parsedDocument = cheerio.load(body);

      var parsedTitle = parseTitle(parsedDocument("title").text());

      var image = parsedDocument("meta[property='og:image']").attr("content");

      if (!image)
        image = parsedDocument("meta[name='twitter:image:src']").attr("content");


      var result = {
        title: parsedTitle.title,
        artist: parsedTitle.artist,
        image: image,
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
  return s
}

var getByArtistSong = function(artist, song, cb) {
  getByURI(uriFromArtistSong(artist, song), cb)
}

module.exports.getByURI = getByURI
module.exports.getByArtistSong = getByArtistSong
module.exports.boppify = boppify
module.exports.uriFromArtistSong = uriFromArtistSong
