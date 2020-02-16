import React from 'react';

import '../App.css';


//stateless comp for individual notes
function Note(props) {
  return (
    <div className="note">
        <span>{props.noteTitle}</span>
        <span>{props.noteText}</span>
    </div>
  );
}

export default Note;
