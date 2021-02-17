const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser: true});
const noteSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String
});

const notes = mongoose.model("Notes", noteSchema);

app.get("/", (req, res)=>{
    notes.find((err, note)=>{
        if(err){
            console.log(err);
        } else {
            var objArr = note.map((noteItem)=>{
                return {_id: noteItem._id, title: noteItem.title, content: noteItem.content};
            });
            res.json(objArr);
        }
    });
});

app.post("/", (req, res)=>{
    let temp=[];
    temp.push(req.body);
    notes.insertMany(temp,(err)=>{
        if(err){
            console.log(err);
        } else {
            res.send("success");
            console.log("Successfully added a new note");
            //console.log(req.body);
        }
    })
});

app.delete("/", (req, res)=>{
    console.log(req.body);
    notes.deleteOne(req.body, (err)=>{
        if(err){
            console.log(err);
        } else {
            console.log("Successfully deleted: ");
            res.send("success");
        }
    });
});

app.listen(4000, function (){
    console.log("Server started on port: 4000");
});