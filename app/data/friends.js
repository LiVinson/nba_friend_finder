var nbaMatches = [
    {
        name: "Lebron James",
        image: "../public/assets/images/james.png/",
        scores: [2, 4, 5, 1, 4, 3, 3, 5, 1, 2]//
    }, {
        name: "Kevin Durant",
        image: "../public/assets/images/durant.png/",
        scores: [3, 1, 1, 5, 2, 5, 1, 4, 3, 4] //29
    }, {
        name: "Kyrie Irving",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //33
    },
    {
        name: "Russell Westbrook",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
    {
        name: "Stephen Curry",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
    {
        name: "Kawhi Leonard",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
    {
        name: "Lonzo Ball",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
    {
        name: "James Harden",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
    {
        name: "Kristaps Porzingis",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5]  //
    },
    {
        name: "Giannis Antetokounmpo",
        image: "../public/assets/images/irving.png/",
        scores: [4, 2, 5, 2, 3, 5, 5, 1, 4, 5] //
    },
];

function findMatch(userScores) {
    var lowScore = 40;
    var userMatch;
    nbaMatches.forEach(function(player) {
        var compareArr = player.scores;
        var diffScore = 0;

        for(var i=0; i < userScores.length; i++) {
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

};


$(".submitBtn").on("click", function (event) {
    event.preventDefault();
    var userSurvey = []; //may change to object with array, and leadMatch

    userSurvey.push.apply(userSurvey,
         [$("#question1").val().substr(0,1),
         $("#question2").val().substr(0,1),
         $("#question3").val().substr(0,1),
         $("#question4").val().substr(0,1),
         $("#question5").val().substr(0,1),
         $("#question6").val().substr(0,1),
         $("#question7").val().substr(0,1),
         $("#question8").val().substr(0,1),
         $("#question9").val().substr(0,1),
         $("#question10").val().substr(0,1),
        ]);

        console.log(userSurvey);
        //Compare userData to each array in nbaMatches array

        findMatch(userSurvey);       
});

// $(".startQuiz").on("click", function (event) {
//     $.get("/survey", function (res, req))
// }