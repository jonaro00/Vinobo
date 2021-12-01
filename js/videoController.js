import Observable from "./observable";

export default class VideoController extends Observable {
  constructor() {
    super();
    this.player = null;
    this.currentTime = 0;

    this.polling = false;
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
  // The API will call this function when the video player is ready.
  onPlayerReady(event) {
    this.initialize(event.target);
    this.setVideoID("-rmlJzh_K6o");
  }
  // The API calls this function when the player's state changes.
  onPlayerStateChange(event) {
    //
  }

  /**
   * Changes the video in player.
   * @param {string} id Video ID to play.
   */
  setVideoID(id) {
    if (!this.player) return;
    player.cueVideoById(id);
  }

  /**
   * Plays the video.
   */
  play() {
    if (!this.player) return;
    this.player.playVideo();
  }

  /**
   * Pauses the video.
   */
  pause() {
    if (!this.player) return;
    this.player.pauseVideo();
  }

  /**
   * Stops the video.
   */
  stop() {
    if (!this.player) return;
    this.player.stopVideo();
  }

  /**
   * Changes the current video time.
   * @param {Number} time The number of seconds from start to seek to.
   */
  seek(time) {
    if (!this.player) return;
    this.player.seekTo(time);
  }

  /**
   * Gets the title of the current video.
   * @returns {string} The video title.
   */
  getTitle() {
    if (!this.player) return;
    return this.player.getVideoData().title;
  }

  /**
   * Checks the current player time and notifies observers if it changed.
   */
  pollTime() {
    if (!this.player) return;
    const prevTime = this.currentTime;
    this.currentTime = this.player.getCurrentTime ? this.player.getCurrentTime() | 0 : 0; // bitwise OR with 0 rounds down to integer
    if (prevTime !== this.currentTime) {
      // has the current second changed?
      this.notifyObservers();
    }
  }

  notifyObservers() {
    // extends parent's method
    if (!this.player) return; // no observers get notified until video loaded
    super.notifyObservers();
  }
}
