import Observable from "./observable";

export default class Model extends Observable {
  constructor() {
    super();
    this.notes = {};
    this.currentVideo = null;
    this.videos = [];
  }
  setCurrentVideo(id) {
    console.log("The currently selected video is ", id);
    this.currentVideo = id;
    this.notifyObservers();
  }
  addVideo(id) {
    console.log("Adding video ID ", id);
    this.videos = [
      ...this.videos,
      {
        id: id,
        title: "Video with ID " + id,
      },
    ];
    this.notifyObservers();
  }
  removeVideo(id) {
    this.videos = this.videos.filter((v) => v.id != id);
    this.notifyObservers();
  }
}
