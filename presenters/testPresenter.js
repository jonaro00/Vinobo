import TestView from "../views/testView";
import useModelProperty from "../js/useModelProperty";

function TestPresenter(props) {
  const videoTime = useModelProperty(props.vidCon, "currentTime");
  return <TestView {...props} time={videoTime} title={null /*props.vidCon.getTitle()*/} />;
}

export default TestPresenter;
