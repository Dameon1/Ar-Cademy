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
    setVideoID(window.location.hash.split('/').at(-1))
    if(isLoading){setIsLoading(false)}
    
  }, [isLoading])
  
  function setState() {
    setVideoID(window.location.hash.split('/').at(-1))
    setIsLoading(true)
  }

  let videoId = window.location.hash.split('/').at(-1);
   let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
   let links = Videos[videoId].sandboxLinks;
  return (
    isLoading ? null : (
    <section>
      <div className="playground-section">
        <VideoPlayerContainer videoID={videoId} setState={setState}/>
        <Sandbox title="sandbox" sandboxContent={sandboxSrc} sandboxLinks={links} />
      </div>
    </section>
  )
  )
}
