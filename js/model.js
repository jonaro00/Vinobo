export default class Model {
  constructor() {
    this.notes = {};
    this.currentVideo = null;

    this.observers = [];
  }
  setCurrentVideo(id) {
    this.currentVideo = id;
    this.notifyObservers();
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }
  removeObserver(callback) {
    this.observers = this.observers.filter((ob) => ob !== callback);
  }
  notifyObservers() {
    this.observers.forEach((cb) => {
      try {
        cb();
      } catch (error) {
        // prevent one observer error from stopping the other callbacks to happen
        console.error("Failed to notify observer", error);
      }
    });
  }
}
