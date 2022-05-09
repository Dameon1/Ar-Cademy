import React, { useState, useEffect } from "react";
import Sandbox from "../Sandbox";
import VideoPlayerContainer from "../VideoPlayerContainer";
import { Videos } from '../../Videos';
import "./playground.css";

export default function Playground() {

  //TODO get Video information from Arweave

  let videoId = new URL(window.location.href).pathname.split('/').at(-1);

  let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      <section>
        <div  className="playground-section">
          <VideoPlayerContainer />
          <Sandbox title="replit" sandboxContent={sandboxSrc} />
        </div>  
      </section>
    );
  }
  return null;
}

