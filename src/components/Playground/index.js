import React from "react";
import Sandbox from "../Sandbox";
import VideoPlayerContainer from "../VideoPlayerContainer";
import { Videos } from '../../Videos';
//import ProgressSpinner from "../ProgressSpinner";

export default function Playground(props) {

  //TODO get Video information from Arweave

  let videoId = new URL(window.location.href).pathname.split('/').at(-1);

  let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];

  let links = Videos[videoId].sandboxLinks;

  return (
    <section>
      <div className="playground-section">
        <VideoPlayerContainer />
        <Sandbox title="replit" sandboxContent={sandboxSrc} sandboxLinks={links} />
      </div>
    </section>
  );

}
