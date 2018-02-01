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

for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * urlArr.length);
    var playerImg = urlArr[randomIndex];
    console.log(playerImg);
    //pick a number 0 - length of urlArr
    var imgDiv = $("<div class='col-sm-4 imageHolder'></div>");
    $(imgDiv).append(`<img  class="img-responsive" src=${playerImg} alt='nba player'>`);


    if (i < 3) {
        $(".row1").append(imgDiv);

        //select row1, 
        //Create wrapper div
        //Create image with playerImg URL and append to div
    } else {
        //select row 2
        $(".row2").append(imgDiv);
    }
    urlArr.splice(randomIndex, 1);

}

//From the images array, select an index at random. Remove this item from the array
//If first 3 - append to the first row
//else append to the second row
//Repeat 6 times




// $("#mainImg1").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);
// $("#mainImg2").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);
// $("#mainImg3").attr("src", urlArr[Math.floor(Math.random() * urlArr.length)]);


//Called when user submits survey
function findMatch(userScores) {
    $("#myForm")[0].reset();

    console.log("RIght before post request");
    console.log(userScores.userSurvey);

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

            //Fill in data in modal: Title, match percent, gif, and player info

            $(".modal-title").html(`It's a Match: <b>${player.name}</b>`);
            $(".modal-body").append(`<p>You and ${player.name} are an ${player.matchPct}% match!<br>`);
            $(".modal-body").append("<div class = 'img_wrapper center-block'><div>");
            $(".img_wrapper").append(`<img class='matchPic' src=${player.gifURL} alt =${player.name} gif>`)
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
    var userData = {
        userSurvey
    };

    //Compare userData to each array in nbaMatches array
    findMatch(userData);
});

$("#closeModal").on("click", function (event) {
    event.preventDefault();
    $(".buttonsAppear").attr("display", "block");

});

$("#myModal").on("hidden.bs.modal", function () {

    $(".modal-body").html("");

});