var nbaMatches = require("../data/playerData");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(nbaMatches);
    });


    app.post("/api/friends", function (req, res) {

        var userArr = req.body.userSurvey;
        console.log(`User scores once post request is received:`);
        console.log(userArr);
        console.log(userArr[0]);
        console.log (typeof userArr[0]);

        var lowScore = 40; //Highest difference possible
        var playerMatch;

        //loops through nbaPlayer array, and compares each index in score array to corresponding user index, calculating difference
        nbaMatches.forEach(function (player) {
            var compareArr = player.scores;
            // console.log(compareArr);
            var diffScore = 0;

            for (var i = 0; i < userArr.length; i++) {
                var diffTemp = (parseInt(userArr[i]) - compareArr[i])
                if (diffTemp < 0) {
                    diffTemp *= (-1)
                }
                diffScore += diffTemp;
            };
            console.log(diffScore);
            if (diffScore < lowScore) {
                console.log(`Better match found!:${player.name} `);
                lowScore = diffScore;
                playerMatch = player;
            }
        });
        
        var matchScore = parseInt(((40 - lowScore) / 40) * 100);
        playerMatch.matchPct = matchScore;
        console.log(playerMatch);

        res.json(playerMatch);
    })

}