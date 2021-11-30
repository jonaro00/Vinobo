import YoutubeTranscript from "youtube-transcript";

export default function handler(req, res) {
  const id = new URL(req.url, `http://${req.headers.host}`).searchParams.get("id");
  YoutubeTranscript.fetchTranscript(id).then((data) => {
    res.status(200).json(data);
  });
}
