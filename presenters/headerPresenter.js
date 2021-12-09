import { signOut } from "@firebase/auth";
import useModelProperty from "../js/useModelProperty";
import HeaderView from "../views/headerView";

export default function HeaderPresenter({ model, auth, vidCon }) {
  const user = useModelProperty(model, "user");
  return (
    <HeaderView
      user={user}
      signOut={(e) => {
        e.preventDefault();
        vidCon?.stop();
        signOut(auth);
      }}
    />
  );
}
