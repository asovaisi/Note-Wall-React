import { useState, useEffect } from "react";
import { Note } from "./Note";

type NoteFormProps = {
    onAdd: (note: Note) => unknown;
    onEdit: (note: Note) => unknown;
    note?: Note | null;
};

const NoteForm = ({ onAdd, onEdit, note }: NoteFormProps) => {
    const [title, setTitle] = useState<string>("");
    const [noteText, setNoteText] = useState<string>("");
    const [deadLine, setDeadLine] = useState<string>("");
    const [errorFields, setErrorFields] = useState<boolean>(false);

    // set states if we have a note for edit
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setNoteText(note.note);
            setDeadLine(note.deadLine);
        }
    }, [note]);

    // handle add new cart if we do not have edit note, otherwise we have edit note then edit
    const handleClick = () => {
        const newNote = new Note(Date.now().toString(), title, noteText, deadLine, new Date());
        if (!title || !noteText || !deadLine) {
            setErrorFields(true);
        } else if (note) {
            // If a note is provided, edit it
            onEdit({ ...note, title: title, note: noteText, deadLine: deadLine });
            setErrorFields(false);
            setTitle("");
            setNoteText("");
            setDeadLine("");
        } else {
            // Otherwise, add a new note
            onAdd(newNote);
            setErrorFields(false);
            setTitle("");
            setNoteText("");
            setDeadLine("");
        }
        // Reset form fields
    };

    return (
        <>
            <div className="bg-gray-600 p-5 block rounded-lg shadow-2xl">
                <h2 className="text-white text-xl mb-4">{note ? "Edit Note" : "Add Note"}</h2>

                <label className="text-white">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-4 rounded" />

                <label className="text-white">Task:</label>
                {/* Changed input to textarea to allow larger content */}
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full p-2 mb-4 rounded h-40" // Set height as needed
                />

                <label className="text-white">Task Deadline</label>
                <input type="date" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} className="w-full p-2 mb-4 rounded" />

                <button className="bg-slate-400 rounded-3xl px-4 py-2 text-white" onClick={handleClick}>
                    {note ? "Update" : "Submit"}
                </button>
            </div>
            {errorFields && <div className="w-full h-10 text-red-700"> Please fill all fields</div>}
        </>
    );
};

export default NoteForm;
