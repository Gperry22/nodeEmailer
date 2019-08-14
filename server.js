var express = require("express");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require('./routes/apiRoutes');

app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
