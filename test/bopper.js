var expect = require("chai").expect;
var bopper = require("../bopper.js");
 
describe("boppify", function() {
	it("replace spaces with hyphens", function(){
           var title = "too much"
           var result = bopper.boppify(title)
 
           expect(result).to.equal("too-much");
    });

    it("lowercase the damn thing", function(){
           var title = "Too Much"
           var result = bopper.boppify(title)
 
           expect(result).to.equal("too-much");
    });

    it("remove extra symbols", function(){
           var title = "7/4 (Shoreline)"
           var result = bopper.boppify(title)
 
           expect(result).to.equal("7-4-shoreline");
    });

    it("keep periods", function(){
           var title = "I. crawl"
           var result = bopper.boppify(title)
 
           expect(result).to.equal("i.-crawl");
    });

    it("keep asterisks", function(){
       var title = "Ni**as In Paris"
       var result = bopper.boppify(title)

       expect(result).to.equal("ni**as-in-paris");
    });

    it("replace & with and", function(){
       var title = "Macklemore & Ryan Lewis"
       var result = bopper.boppify(title)

       expect(result).to.equal("macklemore-and-ryan-lewis");
    });
});

describe("url from song and artist", function() {
	it("nothing special", function(){
           var artist = "Drake"
           var song = "Too Much"
           var result = bopper.uriFromArtistSong(artist, song)
 
           expect(result).to.equal("http://bop.fm/s/drake/too-much");
    });
});