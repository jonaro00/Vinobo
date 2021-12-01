import Observable from "./observable";

export default class Model extends Observable {
  constructor() {
    super();
    this.notes = {};
    this.currentVideo = null;
  }
  setCurrentVideo(id) {
    this.currentVideo = id;
    this.notifyObservers();
  }
}
