import NoteForm from "./NoteForm";
import { Note } from "./Note";
import { useReducer, useState, useEffect } from "react";
import Wall from "./Wall";
import { noteReducer, NoteActionEnum } from "./noteReducer";

const Board = () => {
    const [notes, dispatch] = useReducer(noteReducer, []);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    // Load notes from local storage on component mount
    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            if (notes.length === 0) {
                JSON.parse(storedNotes).map((n: Note) => {
                    dispatch({ type: NoteActionEnum.Add, payLoad: n });
                });
            }
        }
    }, []);

    // Save notes to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Add new item to wall
    const handleAdd = (item: Note) => {
        dispatch({ type: NoteActionEnum.Add, payLoad: item });
    };

    // Edit selected note by click on update button
    const handleEdit = (item: Note) => {
        dispatch({ type: NoteActionEnum.Edit, payLoad: item });
        setEditingNote(null); // Clear editing state after editing
    };

    // Select note that we want to edit
    const startEditing = (note: Note) => {
        setEditingNote(note);
    };

    // ReOrder ordering of notes
    const handleReorder = (sourceIndex: number, destinationIndex: number) => {
        dispatch({
            type: NoteActionEnum.ReOrder,
            payLoad: { sourceIndex, destinationIndex },
        });
    };

    return (
        // <div className="flex ">
        //     <div className="bg-gray-800 w-1/5 h-lvh p-5">
        //         <NoteForm onAdd={handleAdd} onEdit={handleEdit} note={editingNote} />
        //     </div>
        //     <div className="w-full h-full flex-grow p-5">
        //         <Wall notes={notes} dispatch={dispatch} onEdit={startEditing} onReOrder={handleReorder} />
        //     </div>
        // </div>
        <div className="flex h-screen">
            {" "}
            {/* Ensure the height covers the full viewport */}
            <div className="bg-gray-800 w-1/4 h-full p-5 sticky top-0">
                {" "}
                {/* Sticky to make it stay on scroll */}
                <NoteForm onAdd={handleAdd} onEdit={handleEdit} note={editingNote} />
            </div>
            <div className="w-full h-full flex-grow p-5 overflow-y-auto">
                {" "}
                {/* Enable scrolling for the note wall */}
                <Wall notes={notes} dispatch={dispatch} onEdit={startEditing} onReOrder={handleReorder} />
            </div>
        </div>
    );
};

export default Board;
