console.log("friends!");

//Array of player objects
var nbaMatches = [{
        name: "Lebron James",
        imageURL: "/assets/images/lebron_james.jpg",
        gifURL: "",
        scores: [5, 4, 5, 3, 5, 1, 5, 4, 5, 2],
        info: "Some info on this player"
    }, {
        name: "Kevin Durant",
        imageURL: "/assets/images/kevin_durant.jpg",
        gifURL: "",
        scores: [4, 5, 5, 5, 4, 2, 4, 2, 4, 1],
        info: "Some info on this player"
    }, {
        name: "Kyrie Irving",
        imageURL: "/assets/images/kyrie_irving.jpg",
        gifURL: "",
        scores: [1, 1, 2, 4, 4, 3, 3, 1, 2, 1],
        info: "Some info on this player"
    },
    {
        name: "Russell Westbrook",
        imageURL: "/assets/images/russell_westbrook.jpg",
        gifURL: "",
        scores: [3, 4, 3, 1, 4, 1, 4, 5, 3, 4],
        info: "Some info on this player"
    },
    {
        name: "Stephen Curry",
        imageURL: "/assets/images/stephen_curry.jpg",
        gifURL: "",
        scores: [5, 5, 2, 2, 5, 2, 5, 1, 2, 1],
        info: "Some info on this player"
    },
    {
        name: "Kawhi Leonard",
        imageURL: "/assets/images/kawhi_leonard.jpg",
        gifURL: "",
        scores: [1, 4, 1, 3, 4, 5, 3, 3, 1, 4],
        info: "Some info on this player"
    },
    {
        name: "Lonzo Ball",
        imageURL: "/assets/images/lonzo_ball.jpg",
        gifURL: "",
        scores: [1, 3, 1, 3, 2, 3, 1, 3, 4, 2],
        info: "Some info on this player"
    },
    {
        name: "James Harden",
        imageURL: "/assets/images/james_harden.jpg",
        gifURL: "",
        scores: [2, 2, 3, 4, 4, 2, 5, 2, 3, 5],
        info: "Some info on this player"
    },
    {
        name: "Anthony Davis",
        imageURL: "/assets/images/anthony_davis.jpg",
        gifURL: "",
        scores: [1, 4, 3, 2, 3, 4, 3, 2, 1, 5],
        info: "Some info on this player"
    },
    {
        name: "Giannis Antetokounmpo",
        imageURL: "/assets/images/giannis_antetokounmpo.jpg",
        gifURL: "",
        scores: [2, 2, 2, 1, 3, 4, 4, 3, 1, 1],
        info: "Some info on this player"
    },
];

//Generate 3 random player images on home page - Figure otu best way to add "alt" with picture


//Added code to repeat this, changing the players every few 3-5 seconds
$("#mainImg1").attr("src", nbaMatches[Math.floor(Math.random() * nbaMatches.length)].imageURL);
$("#mainImg2").attr("src", nbaMatches[Math.floor(Math.random() * nbaMatches.length)].imageURL);
$("#mainImg3").attr("src", nbaMatches[Math.floor(Math.random() * nbaMatches.length)].imageURL);


//Called when user submits survey
function findMatch(userScores) {
    var lowScore = 40; //Highest difference possible
    var userMatch;

    $("#myForm")[0].reset();
    //loops through nbaPlayer array, and compares each index in score array to corresponding user index, calculating difference
    nbaMatches.forEach(function (player) {
        var compareArr = player.scores;
        var diffScore = 0;

        for (var i = 0; i < userScores.length; i++) {
            var diffTemp = (userScores[i] - compareArr[i])
            if (diffTemp < 0) {
                diffTemp *= -1
            }
            diffScore += diffTemp;
        };
        console.log(diffScore);
        if (diffScore < lowScore) {
            console.log(`Better match found!:${player.name} `)
            lowScore = diffScore;
            userMatch = player
        }
    });
    console.log(userMatch);
    var matchScore = parseInt(((40 - lowScore) / 40) * 100);

    $.post("/api/friends", userMatch, function (player) {
        console.log(`Response received back from post request: ${player.name}`)
        //get gif api
        var queryURL = "https://api.giphy.com/v1/gifs/search";

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            method: "GET",
            data: {
                q: player.name,
                "api_key": "T670yjZdJcSE8EnsVaVaNzeYWhmpEArS",
                limit: 1, //Return 1 gifs (Default 25)
            }
        }).done(function (response) { //Once the ajax request receives a response run the following anonymous callback function:
            player.gifURL = response.data[0].images.fixed_width.url

            //Fill in data in modal
            $(".modal-title").html(`It's a Match: <b>${player.name}</b>`);

            $(".modal-body").prepend(`<p>You and ${player.name} are an ${matchScore}% match!<br>`);
            $("#matchPic").attr("src", player.gifURL);

            $(".modal-body").append(`<br><p>${player.info}</p>`);

            //Make modal appear
            $("#myModal").modal("show")

        })

    })

};

$(".submitBtn").on("click", function (event) {
    event.preventDefault();
    var userSurvey = []; //may change to object with array, and leadMatch

    userSurvey.push.apply(userSurvey, [$("#question1").val().substr(0, 1),
        $("#question2").val().substr(0, 1),
        $("#question3").val().substr(0, 1),
        $("#question4").val().substr(0, 1),
        $("#question5").val().substr(0, 1),
        $("#question6").val().substr(0, 1),
        $("#question7").val().substr(0, 1),
        $("#question8").val().substr(0, 1),
        $("#question9").val().substr(0, 1),
        $("#question10").val().substr(0, 1),
    ]);

    //add steps to put form back to default

    console.log(userSurvey);

    //Compare userData to each array in nbaMatches array
    findMatch(userSurvey);
});

//Remaining Steps:
// 1. Fix button in modal so it can go back to home or restart the survey
// 2. Add links to api data on home and survey page
// 3. Add style, color, fonts, etc to home page
// 4. Add style, color, fonts, etc to survey page
// 5. Add info for each player
// 6. Update gif that comes back from giphy API
// 7. Add style, color, fonts, etc to modal
//8. Add dot.env for GIPHY API
//9. Get working on Heroku
//10. Take a video
//11. Update readMe
//12. Turn In - Due Thursday

