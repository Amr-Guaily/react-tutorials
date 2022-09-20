import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const App = () => {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function updateNote(text) {
    // Move modified notes to the top
    setNotes((prevNotes) => {
      const newArray = [];
      for (let i = 0; i < prevNotes.length; i++) {
        let prevNote = prevNotes[i];
        if (prevNote.id === currentNoteId) {
          newArray.unshift({ ...prevNote, body: text });
        } else {
          newArray.push(prevNote);
        }
      }
      return newArray;
    });
    // This doesn't rearrange the notes
    // setNotes((prevNotes) =>
    //   prevNotes.map((note) => {
    //     return note.id === currentNoteId ? { ...note, body: text } : note;
    //   })
    // );
  }

  function deleteNote(e, id) {
    e.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  return (
    <>
      {notes.length > 0 ? (
        <Split className="container" sizes={[30, 70]} minSize={[160, 250]}>
          <Sidebar
            notes={notes}
            createNewNote={createNewNote}
            setCurrentNoteId={setCurrentNoteId}
            noteId={currentNoteId}
            deleteNote={deleteNote}
          />
          <Editor currentNote={findCurrentNote()} updateNotes={updateNote} />
        </Split>
      ) : (
        <div className="container no-notes">
          <div>
            <h1>You have no notes</h1>
            <button className="btn starter-btn" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
