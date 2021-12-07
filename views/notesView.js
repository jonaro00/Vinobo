import { formatTimestamp } from "../js/transcript";

export default function NotesView(props) {
  return (
    <div>
      <h3>Video: {props.currentVideo}</h3>
      <h4>My notes</h4>
      {props.notes &&
        [...props.notes].map((note) => (
          <div key={note.id}>
            <div>
              <span>{formatTimestamp(note.offset * 1000)}</span> <span>{note.title}</span>
            </div>
            <p>{note.content}</p>
          </div>
        ))}
    </div>
  );
}
