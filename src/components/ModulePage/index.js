import React from "react";
import { Topics } from "../../Creators";
import { Link } from "react-router-dom";
import "./modulePage.css";

function ModulePage() {
    
    let module = new URL(window.location.href).pathname.split('/').at(-1);
    const topics = Object.keys(Topics[module]);
   
    let topicCards = topics.map((topic, index) => {
      let videoObject = Topics[module][topic];
        return (
          <Link to={`/modules/${module}/${videoObject.videoID}`} key={videoObject.videoID} >
            <li className="landingPageBoxes" >
              {index}
              <div className="">
                <img
                  src={videoObject.img}
                  alt="Path Thumbnail"
                />
              </div>
              <div>
                <h2 className=''>{videoObject.title}</h2>
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
            <ul className="topicCard-container">
                {topicCards}
            </ul>
          </section>
        </div>
      );
      //return null;
    }
  

  export default ModulePage;

