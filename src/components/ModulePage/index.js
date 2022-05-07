import React from "react";
import { Topics } from "../../Creators";
import { Link } from "react-router-dom";
import "./modulePage.css";

function ModulePage() {
    
    let module = new URL(window.location.href).pathname.split('/').at(-1);
    //const creators = Object.keys(Creators);
    // const modules = Object.keys(Topics[module]);
    const topics = Object.keys(Topics[module]);
    console.log(topics, "topics");
   
      let videos = topics.map((topic, index) => {
      let topicObject = Topics[module][topic];  
        return (
          <Link to={`/modules/${module}/${topic}`} key={index}>
            {index}
            <li  className="landingPageBoxes">
              <div className="">
                <img
                  src={topicObject.img}
                  alt="Path Thumbnail"
                />
              </div>
              <div>
                <h2 className=''>{topicObject.title}</h2>
                {/* <p>{topicObject.description}</p> */}
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
            <div className="progress-btn-container">
             
            </div>
          </section>
          <section className="">
            <ul className="gp-container">
                {videos}
            </ul>
          </section>
        </div>
      );
      //return null;
    }
  

  export default ModulePage;

