var nbaMatches = require("../data/playerData");
// console.log(nbaMatches);
// var nbaArr = nbaMatches;

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(nbaMatches)
    });

    // app.post("/api/friends", function (req, res){
    //     var playerMatch = req.body;
    //     console.log(`Request received from post : ${JSON.stringify(playerMatch)}`);

    //     res.json(playerMatch);

    // })

    app.post("/api/friends", function (req, res) {

        var userArr = req.body; //This is not displaying...
        console.log(`User scores once post request is received:`);
        console.log(JSON.stringify(userArr));
        var lowScore = 40; //Highest difference possible
        var playerMatch;

        //loops through nbaPlayer array, and compares each index in score array to corresponding user index, calculating difference
        nbaMatches.forEach(function (player) {
            var compareArr = player.scores;
            console.log(compareArr);
            var diffScore = 0;

            for (var i = 0; i < userArr.length; i++) {
                var diffTemp = (userArr[i] - compareArr[i])
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