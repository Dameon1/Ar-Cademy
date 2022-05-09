import React from "react";
import { Link } from "react-router-dom";
import {  Modules } from "../../Modules";
import "./landingPage.css";

export function LandingPage () {
    //const creators = Object.keys(Creators);
    const modules = Object.keys(Modules);
    console.log(modules, "modules");
    const moduleCards = modules.map((module, index) => {
      return (
        <Link to={`/Ar-Cademy/modules/${module}`} key={index} className="landingPageBoxes" >
          <li >
            <h2 className="moduleHeaders">{modules[index]}</h2>
            <img src={ Modules[module].moduleImage} className="heroImage"
              alt={`Follow of ${Modules[module].title}`}/>
            <p className="sample-path-description">{Modules[module].description}</p>
          </li>
        </Link>
      );
    });
    return (
      <div className="home">
        <div className="text-container">
          <h2>Welcome to Ar-cademy</h2>
          <p className="site-introduction">
            Arcademy is community-driven and developed learning platform, for the Arweave ecosystem. 
            Offering a variety of modules, you can learn to code, design, and build with the Arweave blockchain.
            Upload your own instructional videos and make the community leader board or learn a new skill with our community 
            of developers and creators to show Proof of Knowledge (PoK) to the world.
          </p>
          <p className="site-introduction">
            Instructional videos are currently curated and comes with a sandbox to get a more intuitive feel of the content
            and to practice with your own code.
          </p>
        </div>
        <ul className="moduleCards">{moduleCards}</ul>
      </div>
    );
}