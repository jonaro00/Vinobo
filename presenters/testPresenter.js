import TestView from "../views/testView";

function TestPresenter(props) {
  return <TestView id={props.id} />;
}

export default TestPresenter;
