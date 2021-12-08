import useModelProperty from "../js/useModelProperty";
import HeaderView from "../views/headerView";

export default function HeaderPresenter({ model }) {
  const user = useModelProperty(model, "user");
  return <HeaderView user={user} />;
}
