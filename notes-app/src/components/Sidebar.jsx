const Sidebar = ({
  notes,
  createNewNote,
  setCurrentNoteId,
  noteId,
  deleteNote,
}) => {
  const noteElement = notes.map((note) => {
    return (
      <div key={note.id}>
        <div
          className={`note ${noteId === note.id ? 'selected' : ''}`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="note-title">{note.body.split('\n')[0]}</h4>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="trash-icon"
            onClick={(e) => deleteNote(e, note.id)}
          >
            <g fill="#222">
              <path d="M16 5s-1-2-4-2-4 2-4 2H5l.4 2h13.3l.3-2h-3zM9.4 5S10 4 12 4s2.6 1 2.6 1H9.4zM8 21h8l2.4-13H5.6z"></path>
            </g>
          </svg>
        </div>
      </div>
    );
  });

  return (
    <div className="sidebar">
      <div className="head">
        <h2>Notes</h2>
        <button className="btn add-btn" onClick={createNewNote}>
          +
        </button>
      </div>
      <div className="note-list">{noteElement}</div>
    </div>
  );
};

export default Sidebar;
