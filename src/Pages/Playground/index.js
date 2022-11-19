import Sandbox from "../../components/Sandbox";
import VideoPlayerContainer from "../../components/VideoPlayerContainer";
import { Videos } from '../../Videos';
import { useEffect, useState  } from 'react'
export default function Playground() {
  const [videoID, setViedoID] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log("Reloaded")
    if(loading){setLoading(false)}
    
  }, [loading])
  
  function setState() {
    setLoading(true)
  }

  let videoId = new URL(window.location.href).pathname.split('/').at(-1);
  let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
  let links = Videos[videoId].sandboxLinks;
  
  return (
    <section>
      <div className="playground-section">
        <VideoPlayerContainer videoID={videoId} setState={setState}/>
        <Sandbox title="sandbox" sandboxContent={sandboxSrc} sandboxLinks={links} />
      </div>
    </section>
  );

}
