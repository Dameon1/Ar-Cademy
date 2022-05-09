import React from "react";
import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Link } from "react-router-dom";
import "./modulePage.css";

function ModulePage() {
    
    let module = new URL(window.location.href).pathname.split('/').at(-1);
    const videoIds = Topics[module].videosById;
    console.log(videoIds, "videoIds");
   
    let topicCards = videoIds.map((videoId, index) => {
      let videoObject = Videos[videoId];
      console.log(videoObject, "videoObject.videoId");
        return (
            <li key={videoObject.videoId} className="landingPageBoxes"  >
              <Link  to={`/Ar-Cademy/modules/${module}/${videoId}`} >
                {videoObject.videoTitle}
                <div className="">
                  <img
                    src={videoObject.videoImage}
                    alt="Path Thumbnail"
                  />
                </div>
                <div>
                  <h2 className=''>{videoObject.title}</h2>
                  <p>{videoObject.description}</p>
                </div>
              </Link>
            </li>
      );
    });

      return (
        <div className="">
          <section className="">
            <h1 className="">
                {module}
            </h1>
            <p>
                {module.description}
            </p>
          </section>
          <section className="">
            <ul className="topicCard-container">
                {topicCards}
            </ul>
          </section>
        </div>
      );
      //return null;
    }
  

  export default ModulePage;

