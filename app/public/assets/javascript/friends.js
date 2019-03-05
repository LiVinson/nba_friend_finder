const urlArr = [
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

for (let i = 0; i < 6; i++) {
  const randomIndex = Math.floor(Math.random() * urlArr.length);
  const playerImg = urlArr[randomIndex];

  //pick a number 0 - length of urlArr
  const imgDiv = $("<div class='col-sm-4 imageHolder'></div>");
  $(imgDiv).append(
    `<img  class="img-responsive" src=${playerImg} alt='nba player'>`
  );

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

//Called when user submits survey
const findMatch = userScores => {
  $("#myForm")[0].reset();

  $.post("/api/friends", userScores, player => {
    //get gif api

    $.ajax({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      data: {
        q: player.name,
        api_key: "T670yjZdJcSE8EnsVaVaNzeYWhmpEArS",
        limit: 1 //Return 1 gifs (Default 25)
      }
    }).done(response => {
      //Once the ajax request receives a response run the following anonymous callback function:
      player.gifURL = response.data[0].images.fixed_width.url;

      //Fill in data in modal: Title,  percent, gif, and player info

      $(".modal-title").html(`It's a Match: <b>${player.name}</b>`);
      $(".modal-body").append(
        `<p>You and ${player.name} are a <b>${player.matchPct}% match!<b><br>`
      );
      $(".modal-body").append("<div class = 'img_wrapper center-block'><div>");
      $(".img_wrapper").append(
        `<img class='matchPic' src=${player.gifURL} alt =${player.name} gif>`
      );
      $(".modal-body").append(`<br><p>${player.info}</p>`);

      //Make modal appear
      $("#myModal").modal("show");
    });
  });
};

//When survey is submitted - put inside function
$(".submitBtn").on("click", event => {
  event.preventDefault();
  const userSurvey = [
    $("#question1")
      .val()
      .substr(0, 1),
    $("#question2")
      .val()
      .substr(0, 1),
    $("#question3")
      .val()
      .substr(0, 1),
    $("#question4")
      .val()
      .substr(0, 1),
    $("#question5")
      .val()
      .substr(0, 1),
    $("#question6")
      .val()
      .substr(0, 1),
    $("#question7")
      .val()
      .substr(0, 1),
    $("#question8")
      .val()
      .substr(0, 1),
    $("#question9")
      .val()
      .substr(0, 1),
    $("#question10")
      .val()
      .substr(0, 1)
  ];

  const userData = {
    userSurvey
  };

  //Compare userData to each array in nbaMatches array
  findMatch(userData);
});

$("#closeModal").on("click", event => {
  event.preventDefault();
  $(".buttonsAppear").attr("display", "block");
});

$("#myModal").on("hidden.bs.modal", function() {
  $(".modal-body").html("");
});
