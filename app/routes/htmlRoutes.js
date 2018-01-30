var path = require("path");

module.exports = function (app) {
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html")) //path relative to this file
    });
    app.get("/css", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/css/style.css"))
    });
    app.get("/friends", function(req, res) {
        console.log
        res.sendFile(path.join(__dirname, "../data/friends.js"))
    });
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })
}