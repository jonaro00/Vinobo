import Observable from "./observable";

export default class VideoController extends Observable {
  constructor(elementId) {
    super();
    this.elementId = elementId;
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
   * Loads a new `Player` in the `this.elementId` element.
   * @param {String} id Optional video ID to load the player with.
   */
  loadPlayer(id) {
    try {
      this.player = new window.YT.Player(this.elementId, {
        videoId: id,
        playerVars: {
          playsinline: 1,
          modestbranding: 1, // hide YT logo in bottom right
          rel: 0, // show less random suggested videos
        },
        events: {
          onReady: (event) => this.onPlayerReady(event),
          onStateChange: (event) => this.onPlayerStateChange(event),
          onError: (error) => {
            console.log(error);
            this.onPlayerError(error);
          },
        },
      });
      window.player = player; // for debugging video
    } catch (error) {
      console.log("Player failed to load. Tell jonaro00 about this.");
      console.log(error);
    }
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
   * The player will call this function when it is ready.
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
   * The player calls this function when the it's state changes.
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
   * The player (should) call this function when there was an error.
   */
  onPlayerError(error) {
    console.log("player error:", error);
    switch (error.data) {
      case 2:
        // invalid ID
        break;
      case 100:
        // not found (removed or private)
        break;
      case 101:
      case 105:
        // The owner of the requested video does not allow it to be played in embedded players.
        break;
      default:
        // unknown error
        break;
    }
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
        try {
          resolve({ ...this.player.getVideoData(), length: this.player.getDuration() });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Checks the current player time and notifies observers if it changed.
   */
  pollTime() {
    this.execute(() => {
      const prevTime = this.currentTime;
      try {
        this.currentTime = this.player.getCurrentTime() | 0; // bitwise OR with 0 rounds down to integer
      } catch (error) {
        this.currentTime = 0;
      }
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
