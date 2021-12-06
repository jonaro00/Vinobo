import { formatTimestamp } from "../js/transcript";

export default function NotesView(props) {
  return (
    <div>
      <h3>Video: {props.currentVideo}</h3>
      <h4>My notes</h4>
      {[...props.notes].map((note) => (
        <div key={note.title}>
          <div>
            <span>{formatTimestamp(note.offset)}</span> <span>{note.title}</span>
          </div>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}
