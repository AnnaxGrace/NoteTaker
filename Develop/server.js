var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

let i = 0

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let notesRaw = fs.readFileSync(path.join(__dirname, "db/db.json"));
let notes = JSON.parse(notesRaw);

//sets route /notes to notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

//sets route /api/notes to the parsed object data
app.get("/api/notes", function(req, res){
    return res.json(notes);
})

//sets all other routes to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//this takes in a new note data saved and pushes the new object to db.json
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = i + 1
    notes.push(newNote);
    res.json(newNote);
    i++;
})

//this takes in edited note data, and changes title and text based on id
app.post("/api/notes/:id", function(req, res) {
    let editNote = req.body;
    let id = parseInt(req.params.id);
    let indexNumber = notes.map(function(x) {return x.id}).indexOf(id);
    let editable = notes[indexNumber];
    editable.title = editNote.title
    editable.text = editNote.text
    res.json(editable);
})

//This takes in the delete data info, and using the id, splices that object from the array
app.delete("/api/notes/:id", function(req,res) {
   let id = parseInt(req.params.id);
   var indexNumber = notes.map(function(x) {return x.id}).indexOf(id);
    res.send('DELETE request to homepage')
    notes.splice(indexNumber, 1)
})




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})

