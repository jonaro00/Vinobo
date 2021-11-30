import TestView from "../views/testView";

function TestPresenter(props) {
  return <TestView number={props.number} />;
}

export default TestPresenter;
