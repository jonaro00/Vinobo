import Observable from "./observable";

export default class VideoController extends Observable {
  constructor() {
    super();
    this.player = null;
    this.currentTime = 0;

    this.polling = false;

    // dont ask
    this.partiallyInitialized = false;
    this.prioQueue = [];
    this.fullyInitialized = false;
    this.queue = [];
  }

  /**
   * Initializes this instance by receiving a player to control. Starts timer to poll video time.
   * @param {YT.Player} player A YouTube video player object.
   */
  initialize(player) {
    this.player = player;

    this.polling = true;
    setInterval(() => {
      if (!this.polling) return;
      this.pollTime();
    }, 300); // start polling
  }

  /**
   * Ensures callback `cb` is only executed if player is initialized.
   * Otherwise adds it to the queue to be executed when player is ready.
   * @param {Function} cb A callback that does something with the VideoController.
   */
  execute(cb) {
    if (!this.fullyInitialized) {
      this.queue = [...this.queue, cb];
    } else {
      cb();
    }
  }
  executePrio(cb) {
    if (!this.partiallyInitialized) {
      this.prioQueue = [...this.prioQueue, cb];
    } else {
      cb();
    }
  }

  /**
   * The Iframe API will call this function when the video player is ready.
   */
  onPlayerReady(event) {
    this.initialize(event.target);
    if (!this.partiallyInitialized) {
      this.partiallyInitialized = true;
      for (let cb of this.prioQueue) {
        try {
          cb();
        } catch (error) {}
      }
    }
  }
  /**
   * The API calls this function when the player's state changes.
   */
  onPlayerStateChange(event) {
    // The first time the player state is reported as cued,
    // the controller marks itself as initialized.
    if (!this.fullyInitialized && event.data === 5 /* video cued */) {
      this.fullyInitialized = true;
      for (let cb of this.queue) {
        try {
          cb();
        } catch (error) {}
      }
    }
    //this.notifyObservers();
  }

  /**
   * Changes the video in player.
   * @param {string} id Video ID to play.
   */
  setVideoID(id) {
    this.executePrio(() => {
      if (this.fullyInitialized && this.player.getVideoData().video_id === id) return;
      this.player.cueVideoById(id);
      this.fullyInitialized = false;
    });
  }

  /**
   * Plays the video.
   */
  play() {
    this.execute(() => this.player.playVideo());
  }

  /**
   * Pauses the video.
   */
  pause() {
    this.execute(() => this.player.pauseVideo());
  }

  /**
   * Stops the video.
   */
  stop() {
    this.execute(() => this.player.stopVideo());
  }

  /**
   * Changes the current video time.
   * @param {Number} time The number of seconds from start to seek to.
   */
  seek(time) {
    this.execute(() => this.player.seekTo(time));
  }

  /**
   * Gets the data of the current video. Contains id, title, author, length, and more.
   * @returns {Object} The video data.
   */
  getVideoInfo() {
    return new Promise((resolve, reject) => {
      this.execute(() => {
        resolve({ ...this.player.getVideoData(), length: this.player.getDuration() });
      });
    });
  }

  /**
   * Checks the current player time and notifies observers if it changed.
   */
  pollTime() {
    this.execute(() => {
      const prevTime = this.currentTime;
      this.currentTime = this.player.getCurrentTime ? this.player.getCurrentTime() | 0 : 0; // bitwise OR with 0 rounds down to integer
      if (prevTime !== this.currentTime) {
        // has the current second changed?
        this.notifyObservers();
      }
    });
  }

  notifyObservers() {
    // extends parent's method
    this.execute(() => super.notifyObservers());
  }

  /**
   * Used to destroy player when Video player needs to unload.
   */
  destroy() {
    if (this.player !== null) {
      this.player.destroy();
      this.player = null;
    }
    this.prioQueue = [];
    this.queue = [];
  }
}
