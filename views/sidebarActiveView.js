import TextForm from "./textForm.js";

export default function SidebarView(props) {
  return (
    <div>
      <div>My videos</div>
      <table>
        <tbody>
          {[...props.videos].map((video) => {
            return (
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
            );
          })}
          <tr>
            <td colSpan={2}>
              <TextForm
                onSubmit={(ref) => props.addVideo(ref)}
                placeholder="Type video URL or ID"
                submitValue="Add"
              ></TextForm>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
