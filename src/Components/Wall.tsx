import { Dispatch } from "react";
import { Note } from "./Note";
import NoteCart from "./NoteCart";
import { NoteAction, NoteActionEnum } from "./noteReducer";

type WallProps = {
    notes: Note[];
    dispatch: Dispatch<NoteAction>;
    onEdit: (note: Note) => unknown;
    onReOrder: (sourceIndex: number, destinationIndex: number) => void;
};

const Wall = ({ notes, dispatch, onEdit, onReOrder }: WallProps) => {
    const handleMoveLeft = (index: number) => {
        if (index > 0) {
            onReOrder(index, index - 1);
        }
    };

    const handleMoveRight = (index: number) => {
        if (index < notes.length - 1) {
            onReOrder(index, index + 1);
        }
    };
    return (
        <>
            <div className="h-20">
                <span> Number of Tasks : { notes.length}</span>
            </div>
            <div className="h-[2px] w-full bg-black"></div>
            <div className="h-full flex flex-wrap justify-center">
                {notes.map((note: Note, index) => (
                    <NoteCart
                        key={note.id}
                        index={index}
                        handleMoveLeft={handleMoveLeft}
                        handleMoveRight={handleMoveRight}
                        note={note}
                        onDelete={() => {
                            dispatch({ type: NoteActionEnum.Remove, payLoad: note });
                        }}
                        onEdit={() => onEdit(note)}
                    />
                ))}
            </div>
        </>
    );
};

export default Wall;
