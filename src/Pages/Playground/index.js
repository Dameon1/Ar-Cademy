import Sandbox from "../../components/Sandbox";
import VideoPlayerContainer from "../../components/VideoPlayerContainer";
import { Videos } from '../../Videos';
import { useEffect, useState  } from 'react'
import {
  Loading,
} from "@nextui-org/react";


export default function Playground() {
  const [videoID, setVideoID] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("Reloaded")
    setVideoID(new URL(window.location.href).pathname.split('/').at(-1))
    if(isLoading){setIsLoading(false)}
    
  }, [isLoading])
  
  function setState() {
    setVideoID(new URL(window.location.href).pathname.split('/').at(-1))
    setIsLoading(true)
  }

  let videoId = new URL(window.location.href).pathname.split('/').at(-1);
  let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
  let links = Videos[videoId].sandboxLinks;
  
  return (
    isLoading ? null : (
    <section>
      <div className="playground-section">
        <VideoPlayerContainer videoID={videoID} setState={setState}/>
        <Sandbox title="sandbox" sandboxContent={sandboxSrc} sandboxLinks={links} />
      </div>
    </section>
  )
  )
}
