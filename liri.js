// Functions are run by the following Node Modules
	var fs = require("fs"); //Files are read and written by FS
	var request = require("request");
	var keys = require("./keys.js");
	var omdb = require('omdb');
	var twitter = require("twitter");
	var Spotify = require ("node-spotify-api");
	var liriArgument = process.argv[2];

	var spotify = new Spotify({
  id: "c8be503514674a279e05b0a0942ba46e",
  secret: "262f9c618c0b439194eb6379977b8b6b"
});

	switch(liriArgument) {
	case "my-tweets": myTweets(); break;
	case "spotify-this-song": spotifyThisSong(); break;
	case "movie-this": movieThis(); break;
	case "do-what-it-says": doWhatItSays(); break;
	};

    function myTweets() {
		console.log(keys);

		var client = new twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});
		var twitterUsername = process.argv[3];