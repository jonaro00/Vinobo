const ytRegex =
  /^((https?:\/\/)?(youtu\.be\/|www\.youtube\.com\/watch\?.*v=))?([A-Za-z0-9-_]{11}).*$/;
// /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

/**
 * Takes in a YouTube URL or video ID and returns the video ID.
 * @param {string} URL_or_ID The string to extract video ID from.
 * @returns The ID or `null`.
 */
function extractID(URL_or_ID) {
  const match = URL_or_ID.match(ytRegex);
  return match ? match[4] : null;
}

/**
 * Fetches the YT transcript for the given video ID.
 * @param {string} id A valid YT video ID.
 * @returns A promise yielding the JSON response.
 */
function getTranscript(id) {
  return fetch(`/api/get_transcript?id=${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res;
    })
    .then((res) => res.json());
}

/**
 * Format timestamp of milliseconds to [hh:]mm:ss. Rounds down to nearest whole second.
 * @param {Number} ms Number of milliseconds.
 * @returns {string} Formatted timestamp.
 */
function formatTimestamp(ms) {
  let sec = Math.floor(ms / 1000);
  let hrs = Math.floor(sec / 3600);
  sec %= 3600;
  let min = Math.floor(sec / 60);
  sec %= 60;
  sec = `00${sec}`.substring(String(sec).length);

  if (hrs) {
    min = `00${min}`.substring(String(min).length);
    return `${hrs}:${min}:${sec}`;
  }
  return `${min}:${sec}`;
}

export { ytRegex, extractID, getTranscript, formatTimestamp };
