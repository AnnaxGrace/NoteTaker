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

//this takes in the data saved and pushes the new object to db.json
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = i + 1
    notes.push(newNote);
    res.json(newNote);
    i++;
})

app.post("/api/notes/:id", function(req, res) {
    let editNote = req.body;
    let id = parseInt(req.params.id);
    var indexNumber = notes.map(function(x) {return x.id}).indexOf(id);
    var editable = notes[indexNumber];
    editable.title = editNote.title
    editable.text = editNote.text
    res.json(editable);
})

//this takes the id string, makes it a number. And then goes through the notes array and finds the index number of the object with that id. We use that index number to splice that id out of the array
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

//commenting for commit