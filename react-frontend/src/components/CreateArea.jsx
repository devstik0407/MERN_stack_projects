import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function addNote(event) {
    props.onAdd(note);
    setNote((prev) => {
      return { title: "", content: "" };
    });
    event.preventDefault();
  }

  function updateNote(event) {
    const { name, value } = event.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  return (
    <div>
      <form onSubmit={addNote} onChange={updateNote}>
        <input name="title" placeholder="Title" value={note.title} />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
