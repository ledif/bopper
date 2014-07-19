bopper
======

Parse bop.fm urls for song information.

Requires
------

 - node.js
 - express
 - request, cheerio, morgan

To install the correct npms:
```
npm install express morgan request cheerio --save
```

Run
------
```
node web.js
```
Usage
------
Issue a get request to the root of the server, with the uri query parameter as the bop.fm url.

_Example_:

```
http://localhost:5000/?uri=http://bop.fm/s/the-wonder-years/there-there
```
would return the following result

```
{
  "title": "There, There",
  "artist": "The Wonder Years",
  "image": "https://res.cloudinary.com/hyam10gog/image/fetch/c_fill/http://a2.mzstatic.com/us/r30/Music2/v4/10/e3/e0/10e3e0a2-9d12-8675-2404-8740155fbe6d/HR771_twy_greatest_cover.1200x1200-75.jpg"
}
```
