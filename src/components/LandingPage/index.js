import React from "react";
import "./landingPage.css";
import { Creators, Modules } from "../../Creators";

export function LandingPage () {
    const creators = Object.keys(Creators);
    const modules = Object.keys(Modules);
    
    const paths = modules.map((module, index) => {
      return (
        <li  key={index}  className="landingPageBoxes"
             onClick={() => (window.location.href = `/modules/${modules[index]}`)}>
          <h2 className="moduleHeaders">{modules[index]}</h2>
          <img src={ Creators[creators[index]].videoImage}  className="heroImage"
            alt={`Follow of ${Creators[creators[index]].title}`}/>
          <p className="sample-path-description">{Creators[creators[index]].description}</p>
        </li>
      );
    });
    return (
      <div className="home">
        <div className="guest-container">
          <h2>Welcome to Ar-cademy</h2>
          <p className="site-introduction">
            Arcademy is a one stop shop for the Arweave developer. It has
            instructional videos along with an essential IDE to code along with
            on the same screen. Pick through an assortment of
            protocols and capabilities to learn the latest 'Weave' in the
            Permaweb industry. Sample code is provided with each video to be able to
            follow along with the developer inspired instructional videos.
          </p>
        </div>
        <ul className="gp-container">{paths}</ul>
      </div>
    );
}