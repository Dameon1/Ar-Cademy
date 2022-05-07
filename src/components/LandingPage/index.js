import React from "react";
import { Link } from "react-router-dom";
import {  Modules } from "../../Creators";
import "./landingPage.css";

export function LandingPage () {
    //const creators = Object.keys(Creators);
    const modules = Object.keys(Modules);
    console.log(modules, "modules");
    const moduleCards = modules.map((module, index) => {
      return (
        <Link key={index} to={`/modules/${module}`}>
        <li className="landingPageBoxes">
          <h2 className="moduleHeaders">{modules[index]}</h2>
          <img src={ Modules[module].moduleImage}  className="heroImage"
            alt={`Follow of ${Modules[module].title}`}/>
          <p className="sample-path-description">{Modules[module].description}</p>
        </li>
        </Link>
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
        <ul className="gp-container">{moduleCards}</ul>
      </div>
    );
}