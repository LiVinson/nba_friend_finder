const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/app/public"));

require("./app/routes/htmlRoutes")(app);
require("./app/routes/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
