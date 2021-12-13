import YoutubeTranscript from "youtube-transcript";

export default async function handler(req, res) {
  const id = new URL(req.url, `http://${req.headers.host}`).searchParams.get("id");
  return YoutubeTranscript.fetchTranscript(id)
    .then((data) => {
      res.setHeader("Cache-Control", "s-maxage=86400");
      return {
        status: "success",
        data: res.status(200).json(data),
      };
    })
    .catch((error) => ({
      status: "error",
      data: res.status(500).json(error),
    }));
}
