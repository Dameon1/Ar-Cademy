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
          <Link key={videoObject.videoId} to={`/Ar-Cademy/modules/${module}/${videoId}`} className="PageBoxes">
                <li key={videoObject.videoId}   >
                <h2 className="">{videoObject.videoTitle}</h2>
                <div className="">
                  <img
                    src={videoObject.videoImage}
                    alt="Path Thumbnail"
                  />
                </div>
                <div>
                  <h2 className='moduleHeaders'>{videoObject.title}</h2>
                  <p>{videoObject.description}</p>
                </div>
            </li>
              </Link>
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
            <ul className="moduleCards">
                {topicCards}
            </ul>
          </section>
        </div>
      );
      //return null;
    }
  

  export default ModulePage;

