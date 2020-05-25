var express = require("express");
var path = require("path");
var fs = require("fs");
// var notes = require("db.json");

var app = express();
var PORT = 8080;

let i = 0

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let notesRaw = fs.readFileSync(path.join(__dirname, "db/db.json"));
let notes = JSON.parse(notesRaw);

console.log(notes);

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", function(req, res){
    return res.json(notes);
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = i + 1
    notes.push(newNote);
    res.json(newNote);
    i++;
    // app.get("/api/notes/")
})

app.delete("/api/notes/:id", function(req,res) {
   let id = parseInt(req.params.id);
   var indexNumber = notes.map(function(x) {return x.id}).indexOf(id);
    res.send('DELETE request to homepage')
    notes.splice(indexNumber, 1)
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    //localhost:8080/
})

