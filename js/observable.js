export default class Observable {
  constructor() {
    this.observers = [];
  }
  addObserver(callback) {
    console.log("Adding observer to model");
    this.observers = [...this.observers, callback];
  }
  removeObserver(callback) {
    this.observers = this.observers.filter((ob) => ob !== callback);
  }
  notifyObservers() {
    this.observers.forEach((cb) => {
      try {
        console.log("Calling all observer callbacks");
        cb();
      } catch (error) {
        // prevent one observer error from stopping the other callbacks to happen
        console.error("Failed to notify observer", error);
      }
    });
  }
}
