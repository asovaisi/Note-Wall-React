import { Note } from "./Note";

export type NoteState = Note[];

export enum NoteActionEnum {
    Add,
    Remove,
    Edit,
    ReOrder,
}

export type AddAction = {
    type: NoteActionEnum.Add;
    payLoad: Note;
};

export type RemoveAction = {
    type: NoteActionEnum.Remove;
    payLoad: Note;
};

export type EditAction = {
    type: NoteActionEnum.Edit;
    payLoad: Note;
};

export type ReOrderAction = {
    type: NoteActionEnum.ReOrder;
    payLoad: { sourceIndex: number; destinationIndex: number };
};

export type NoteAction = AddAction | RemoveAction | EditAction | ReOrderAction;

export function noteReducer(state: NoteState, action: NoteAction) {
    switch (action.type) {
        case NoteActionEnum.Add:
            return [...state, action.payLoad];
        case NoteActionEnum.Remove:
            return state.filter((e) => e.id !== action.payLoad.id);
        case NoteActionEnum.Edit:
            return state.map((note) => (note.id === action.payLoad.id ? action.payLoad : note));
        case NoteActionEnum.ReOrder:
            const { sourceIndex, destinationIndex } = action.payLoad;
            const newState = [...state];
            const [movedNote] = newState.splice(sourceIndex, 1);
            newState.splice(destinationIndex, 0, movedNote);
            return newState;
        default:
            return state;
    }
}
