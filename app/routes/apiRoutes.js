var path = require("path");

var nbaArr = [
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
        scores: [1, 2, 3, 2, 1, 4, 2, 3, 5, 2] //
    },
    {
        name: "Stephen Curry",
        image: "../public/assets/images/irving.png/",
        scores: [4, 1, 2, 1, 4, 5, 2, 3, 1, 2] //
    },
    {
        name: "Kawhi Leonard",
        image: "../public/assets/images/irving.png/",
        scores: [2, 5, 1, 2, 1, 2, 4, 2, 1, 3] //
    },
    {
        name: "Lonzo Ball",
        image: "../public/assets/images/irving.png/",
        scores: [1, 4, 2, 3, 2, 4, 1, 2, 1, 3] //
    },
    {
        name: "James Harden",
        image: "../public/assets/images/irving.png/",
        scores: [2, 5, 2, 4, 1, 2, 5, 1, 3, 3] //
    },
    {
        name: "Kristaps Porzingis",
        image: "../public/assets/images/irving.png/",
        scores: [3, 1, 5, 3, 1, 2, 4, 4, 2, 1]  //
    },
    {
        name: "Giannis Antetokounmpo",
        image: "../public/assets/images/irving.png/",
        scores: [1, 4, 5, 2, 3, 1, 2, 4, 1, 2] //
    },
];

module.exports = function (app) {

        app.get("/api/friends", function (req, res) {
            res.json(nbaArr)
        });

        app.post("/api/friends", function (req, res){
            var playerMatch = req.body;
            console.log(`Request received from post : ${JSON.stringify(playerMatch)}`);

            res.json(playerMatch);

        })



}