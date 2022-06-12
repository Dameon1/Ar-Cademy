import Sandbox from "../../components/Sandbox";
import VideoPlayerContainer from "../../components/VideoPlayerContainer";
import { Videos } from '../../Videos';

export default function Playground() {

  let videoId = new URL(window.location.href).pathname.split('/').at(-1);

  let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
  let src = Object.keys(Videos[videoId].sandboxLinks)[0];
  let links = Videos[videoId].sandboxLinks;

  return (
    <section>
      <div className="playground-section">
        <VideoPlayerContainer />
        <Sandbox title="sandbox" sandboxContent={sandboxSrc} sandboxLinks={links} />
      </div>
    </section>
  );

}
