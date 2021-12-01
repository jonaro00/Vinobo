function TestView(props) {
  return (
    <p>
      This is TestView. Current video ID is {props.id}. Current time is {props.time}s. Video title
      is <b>{props.title || "[loading...]"}</b>.
    </p>
  );
}

export default TestView;
