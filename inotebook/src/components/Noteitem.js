import React, { useContext } from 'react'
import notecontext from '../context/notes/NoteContext'



const Noteitem = (props) => {
    const context = useContext(notecontext)
    const { deleteNote } = context

    const { note, updateNote } = props;

    const handledelete = () => {
        props.showAlert("Noted deleted successfully", "primary")
        deleteNote(note._id)
    }
    return (
        <>
            <div className="card my-2 mx-2" style={{ width: '30%' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title.toUpperCase()}</h5>

                    {note.description.length > 48 ? <p className="card-text">{note.description.substr(0, 45)}...</p> : <p className="card-text">{note.description}</p>}
                    <h6 class="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <div className='d-flex justify-content-between'>
                        <span class="material-icons-outlined" onClick={handledelete}>
                            &#xe92e;
                        </span>
                        <span class="material-symbols-outlined" onClick={() => { updateNote(note) }}>
                            &#xe3c9;
                        </span>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Noteitem
