import React, { useState, useEffect } from 'react';

import '../App.css';


function NoteEditor(props) {

  const [currTitle,setCurrTitle] = useState(props.currNote.title);
  const [currText,setCurrText] = useState(props.currNote.text);

  
  useEffect(()=>{
    setCurrTitle(props.currNote.title);
    setCurrText(props.currNote.text);
  },[props]);

 
  
  return (
    <div id="note-editor-container">
        <button onClick={()=>{
          props.saveNote(currTitle,currText)
        }}>Save Note!</button>
        <input 
            
            placeholder="Enter the title you want for your note" 
            value={currTitle}
            id="title"
            onChange={(event)=>setCurrTitle(event.target.value)}
            
        />

        <textarea
            placeholder="Enter the content for your note"
            id="note-editor"
            value={currText}
            onChange={(event)=>setCurrText(event.target.value)}
            
        />
    </div>
  );
}

export default NoteEditor;
