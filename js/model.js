import Observable from "./observable";
const { randomUUID } = import("crypto");

export default class Model extends Observable {
  constructor() {
    super();
    this.currentVideo = null;
    this.videos = [];
  }
  setCurrentVideo(id) {
    if (this.currentVideo === id) return;
    this.currentVideo = id;
    this.notifyObservers();
  }
  getVideo() {
    for (const vid of this.videos) if (vid.id === this.currentVideo) return { ...vid };
    return {};
  }
  addVideo(videoObj) {
    // Only add if video is not already in list
    if (this.videos.map((obj) => obj.id).includes(videoObj.id)) return;
    this.videos = [...this.videos, videoObj];
    this.notifyObservers();
  }
  removeVideo(id) {
    this.videos = this.videos.filter((vid) => vid.id !== id);
    this.notifyObservers();
  }
  getNotes() {
    for (const vid of this.videos) if (vid.id === this.currentVideo) return [...vid.notes];
    return [];
  }
  addNote(noteObj) {
    this.videos = this.videos.map((vid) => {
      if (this.currentVideo === vid.id)
        // insert and sort note
        vid.notes = [...vid.notes, noteObj].sort((a, b) =>
          a.offset < b.offset ? -1 : a.offset > b.offset ? 1 : 0
        );
      return vid;
    });
    this.notifyObservers();
  }
  removeNote(noteId) {
    let changed = false;
    this.videos = this.videos.map((vid) => {
      if (this.currentVideo === vid.id)
        // remove note
        vid.notes = vid.notes.filter((note) => note.id !== noteId && ((changed = false) || true));
      return vid;
    });
    if (changed) this.notifyObservers();
  }
}

export class Video {
  constructor(id, title, author, length) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.length = length;
    this.notes = [];
  }
}

export class Note {
  constructor(offset, title, content) {
    this.id = randomUUID ? randomUUID() : crypto.randomUUID ? crypto.randomUUID() : "0";
    this.offset = offset;
    this.title = title;
    this.content = content;
  }
}
