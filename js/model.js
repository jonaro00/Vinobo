import Observable from "./observable";

export default class Model extends Observable {
  constructor() {
    super();
    this.notes = [];
    this.currentVideo = null;
    this.videos = [];
  }
  addNote(noteObj) {
    this.notes = [...this.notes, noteObj];
    this.notifyObservers();
  }
  setCurrentVideo(id) {
    if (this.currentVideo === id) return;
    this.currentVideo = id;
    this.notifyObservers();
  }
  addVideo(videoObj) {
    // Only add if video is not already in list
    if (this.videos.map((obj) => obj.id).includes(videoObj.id)) return;
    this.videos = [...this.videos, videoObj];
    this.notifyObservers();
  }
  removeVideo(id) {
    this.videos = this.videos.filter((v) => v.id != id);
    this.notifyObservers();
  }
}
