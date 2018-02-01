console.log("friends!");

var urlArr = [
    "/assets/images/lebron_james.jpg",
    "/assets/images/kevin_durant.jpg",
    "/assets/images/kyrie_irving.jpg",
    "/assets/images/russell_westbrook.jpg",
    "/assets/images/stephen_curry.jpg",
    "/assets/images/kawhi_leonard.jpg",
    "/assets/images/lonzo_ball.jpg",
    "/assets/images/james_harden.jpg",
    "/assets/images/anthony_davis.jpg",
    "/assets/images/giannis_antetokounmpo.jpg"
];

    $("#mainImg1").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);
    $("#mainImg2").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);
    $("#mainImg3").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);


//Called when user submits survey
function findMatch(userScores) {
    $("#myForm")[0].reset();

    console.log("RIght before post request");
    console.log(userScores);

    $.post("/api/friends", userScores, function (player) {
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

            $(".modal-body").prepend(`<p>You and ${player.name} are an ${player.matchPct}% match!<br>`);
            $("#matchPic").attr("src", player.gifURL);

            $(".modal-body").append(`<br><p>${player.info}</p>`);

            //Make modal appear
            $("#myModal").modal("show")
        })

    })

};

//When survey is submitted - put inside function
$(".submitBtn").on("click", function (event) {
    event.preventDefault();
    var userSurvey = []; 

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

$("#closeModal").on("click", function (event) {
    event.preventDefault();
    $(".buttonsAppear").attr("display", "block");

})
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