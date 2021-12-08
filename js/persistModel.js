import { auth, database } from "./firebaseSetup";
import { set, ref, onValue } from "firebase/database";

export default function persistModel(model) {
  let loadingFromFirebase = false;
  model.addObserver(function () {
    if (loadingFromFirebase) return;
    console.log("Writing to database");
    set(ref(database, "users/" + auth.currentUser?.uid), {
      videos: model.videos,
      currentVideo: model.currentVideo,
    });
  });
  onValue(ref(database, "users/" + auth.currentUser?.uid), function (data) {
    loadingFromFirebase = true;
    try {
      if (data.val()) {
        model.setVideos(data.val().videos || []);
        model.setCurrentVideo(data.val().currentVideo || null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      loadingFromFirebase = false;
    }
  });
}
