	var fs = require("fs");
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
    default: console.log("\r\n" +"Use one of the following Liri commands: " +"\r\n"+
        "1. my-tweets 'any Twitter name' " +"\r\n"+
        "2. spotify-this-song 'any song name' "+"\r\n"+
        "3. movie-this 'any movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Put the movie/song name in quotation marks if it's more than one word.");
};


function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "Mr. Nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?apikey=40e9cece") + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            console.log(movieObject);
            var movieResults =

        "Title: " + movieObject.Title+"\r\n"+
        "Year: " + movieObject.Year+"\r\n"+
        "Rating: " + movieObject.imdbRating+"\r\n"+
        "Country: " + movieObject.Country+"\r\n"+
        "Language: " + movieObject.Language+"\r\n"+
        "Plot: " + movieObject.Plot+"\r\n"+
        "Actors: " + movieObject.Actors+"\r\n"+
        "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
        "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
        
            console.log(movieResults);
            log(movieResults);
        } else {
            console.log("Error :"+ error);
            return;
        }
    }
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
    if(!twitterUsername){
        twitterUsername = "yamyamdoe";
    }
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(error, data, response){
        if (!error) {
            for(var i = 0; i < data.length; i++) {
    

                var twitterResults = 
                "@" + data[i].user.screen_name + ": " + 
                data[i].text + "\r\n" + 
                data[i].created_at + "\r\n" + 
                "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults); 
            }
        }  else {
            console.log("Error :"+ error);
            return;
        }
    });
}




function spotifyThisSong(songName) {
        
    var songName = process.argv[3];
    if(!songName){
        songName = "The Sign";
    }
    params = songName;
    spotify.search({ type: "track", query: params }, function(err, data) {
        if(!err) {
        var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "URL: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); 
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};



function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};




function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}