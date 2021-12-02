import Observable from "./observable";

export default class Model extends Observable {
  constructor() {
    super();
    this.notes = {};
    this.currentVideo = null;
    this.videos = [];
  }
  setCurrentVideo(id) {
    this.currentVideo = id;
    this.notifyObservers();
  }
  addVideo(id) {
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
