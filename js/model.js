import Observable from "./observable";

export default class Model extends Observable {
  constructor() {
    super();
    this.notes = {};
    this.currentVideo = null;
    this.videos = [];
  }
  setCurrentVideo(id) {
    if (this.currentVideo === id) return;
    this.currentVideo = id;
    this.notifyObservers();
  }
  addVideo(id) {
    // Only add if video is not already in list
    if (this.videos.map((obj) => obj.id).includes(id)) return;
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
