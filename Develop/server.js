var express = require("express");
var path = require("path");
// var notes = require("db.json");

var app = express();
var PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "/public/assets/js")));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    //localhost:8080/
})

