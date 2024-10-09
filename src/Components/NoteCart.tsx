// Importing Material UI icons and other components
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Note } from "./Note";

type NoteCartProps = {
    note: Note;
    onDelete: (note: Note) => void;
    onEdit: (note: Note) => void;
    handleMoveLeft: (index: number) => void;
    handleMoveRight: (index: number) => void;
    index: number;
};

const NoteCart = ({ note, onDelete, onEdit, handleMoveLeft, handleMoveRight, index }: NoteCartProps) => {
    const createDateString = note.createTime ? new Date(note.createTime).toLocaleDateString() : "N/A";
    const deadLineDateString = note.deadLine ? new Date(note.deadLine).toLocaleDateString() : "N/A";

    const currentDate = new Date();

    // Check if the deadline has passed
    const isDeadlineReached = new Date(note.deadLine) ? new Date(note.deadLine) <= currentDate : false;

    // Change the background color conditionally based on the deadline
    const cartBgColor = isDeadlineReached ? 'bg-red-300' : 'bg-gray-300';

    return (
        <div className={`${cartBgColor} w-80 h-80 rounded-lg shadow-lg m-4 p-5 flex flex-col justify-between`}>
            {/* Title Section */}
            <div className="flex flex-row-reverse w-full h-10 items-right mb-3">
                {/* <div className="flex  space-x-2"> */}
                {/* Delete Icon */}
                <button onClick={() => onDelete(note)} className="text-red-600  hover:text-red-800 transition" title="Delete">
                    <DeleteIcon fontSize="small" />
                </button>
                {/* Edit Icon */}
                <button onClick={() => onEdit(note)} className="text-blue-600  hover:text-blue-800 transition" title="Edit">
                    <EditIcon fontSize="small" />
                </button>
                {/* </div> */}
            </div>

            {/* Note Title */}
            <p className="text-xl w-full h-12 font-semibold text-gray-800 overflow-hidden">{note.title}</p>

            {/* Note Content */}
            <p className="text-gray-700 mb-2 w-full h-32 overflow-auto break-words">{note.note}</p>

            {/* Footer with Time Info */}
            <div className="text-sm text-gray-500">
                <p>Created : {createDateString}</p>
                <p>Deadline: {deadLineDateString}</p>
            </div>

            {/* Action Buttons for Reordering */}
            <div className="flex justify-between mt-4">
                <button onClick={() => handleMoveLeft(index)} className="flex items-center text-blue-600  hover:text-gray-900 transition" title="Move Left" disabled={index === 0}>
                    <ArrowBackIcon fontSize="small" />
                    <span className="ml-1"></span>
                </button>
                <button
                    onClick={() => handleMoveRight(index)}
                    className="flex items-center text-blue-600  hover:text-gray-900 transition"
                    title="Move Right"
                    // disabled={index === notes.length - 1}
                >
                    <span className="mr-1"></span>
                    <ArrowForwardIcon fontSize="small" />
                </button>
            </div>
        </div>
    );
};

export default NoteCart;
