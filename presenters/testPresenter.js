import TestView from "../views/testView";
import useModelProperty from "../js/useModelProperty";
import usePromise from "../js/usePromise";
import React from "react";

function TestPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const videoTime = useModelProperty(props.vidCon, "currentTime");

  const [promise, setPromise] = React.useState(null);
  React.useEffect(() => setPromise(props.vidCon.getTitle()), [id]);
  const [data, error] = usePromise(promise);

  return <TestView id={id} time={videoTime} title={error ? "ERROR!" : data || "loading..."} />;
}

export default TestPresenter;
