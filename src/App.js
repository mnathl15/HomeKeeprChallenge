import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './Components/Note';
import NoteEditor from './Components/NoteEditor';


function App() {

  const [notes,setNotes] = useState({});
  const [currNote,selectCurrNote] = useState("");
  

  setUpDefaultNotes();

  //This functions just gives you default notes if there aren't any already saved in localstorage
  function setUpDefaultNotes(){
    if(!window.localStorage.getItem("notes")){
      let someNotes={};
      const key1 = createRandomNoteKey();
      const key2 = createRandomNoteKey();
      someNotes[key1] = {
        title:"note 1",
        text:"THIS IS THE FIRST NOTE",
        key:key1
      }
      someNotes[key2] = {
        title:"note 2",
        text:"THIS IS THE SECOND NOTE",
        key:key2
      }

      someNotes = JSON.stringify(someNotes);
      localStorage.setItem("notes",someNotes);
      someNotes = JSON.parse(someNotes);
    }
  }

  //Creates a unique key for each note
  function createRandomNoteKey(){
    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }

  
  useEffect(()=>{
    retrieveNotes();

  },[])

  function retrieveNotes(){
    setNotes(JSON.parse(window.localStorage.getItem("notes")));
  }

  
  function createNote(){
    let newNote = {};
    const newKey = createRandomNoteKey();
    newNote[newKey] = {
      title:"New note",
      text:"You just created a new note",
      key: newKey
    }
    
    const newNotes = {...notes,...newNote};
    window.localStorage.setItem("notes",JSON.stringify(newNotes));
    updateApp(newNotes);
  }

  //Whenever the user clicks the save button on the editor, this func will be called
  function saveNote(newTitle,newText){
    notes[currNote.key].title = newTitle;
    notes[currNote.key].text = newText; 
    window.localStorage.setItem("notes",JSON.stringify(notes));
    updateApp(notes);
  }

  //Callback function for updating the app. This is because updating localstorage doesn't update the state of the app.
  function updateApp(newNotes){
    setNotes(newNotes);
  }

  //Sets the current note in focus
  function selectNote(key){
    selectCurrNote(notes[key]);
  }
  
  return (
    <div className="App">
      
         <div id="note-list">
            <button id="create-note" onClick={createNote}>Create new note!</button>
            {Object.keys(notes).map((val)=>{
              
              return(
                <button key={val.key} id="note-button" onClick={()=>selectNote(val)}>
                  <Note
                    noteTitle={notes[val].title} 
                    noteText={notes[val].text}
                  />
                </button>
                )
            })}
        </div> 

        {currNote !== "" &&
          <NoteEditor
            currNote={currNote}
            saveNote={saveNote}
          />
        }
      </div>
  );
}
export default App;
