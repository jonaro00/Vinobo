import TextForm from "./textForm.js";

export default function SidebarView(props) {
  return (
    <div>
      <div>Open video</div>
      <TextForm
        onSubmit={(ref) => props.videoChoice(ref)}
        placeholder="Type in video URL or ID"
        submitValue="Open"
      ></TextForm>
      <button onClick={() => props.addCurrentVideo()}>Add to videos</button>
      <div>
        <div>My videos</div>
        <table>
          <tbody>
            {[...props.videos].map((video) => (
              <tr key={video.id}>
                <td>
                  <a
                    href=""
                    onClick={(event) => {
                      event.preventDefault();
                      props.videoChoice(video.id);
                    }}
                  >
                    {video.title}
                  </a>
                </td>
                <td>
                  <button onClick={() => props.removeVideo(video.id)}>x</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
