import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  var [notes, setNotes] = useState([]);
  
  axios.get("http://localhost:4000/")
  .then((res)=>{
    setNotes((prev)=>{
      prev = res.data;
      return prev;
    });
  })
  .catch((err)=>{
    console.log(err);
  })
  .then(()=>{
    ;
  });

  function addNote(note) {
    let id = 0;
    for(let i = 0; i<notes.length; i++){
      id = Math.max(id, notes[i]. _id);
    }
    id++;

    note = {...note, _id: id};

    axios.post("http://localhost:4000/", note)
    .then((res)=>{ console.log(res.data);})
    .catch((err)=>{ console.log(err);});

    setNotes(() => {
      notes = [...notes, note];
      return notes;
    });
  }

  function deleteNote(id) {
    
    axios.delete(`http://localhost:4000/`, {data: {_id: id}})
    .then((res)=>{
      console.log(res.data);
      setNotes((prevNotes) => {
        return prevNotes.filter((noteItem) => {
          return noteItem._id !== id;
        });
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
