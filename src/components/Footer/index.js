import React from "react";
import "./Footer.css";
import permaSeal from "../../light.png"
export function Footer() {

  return (
    <footer className="main-footer">
      <div className="permaSeal">
        <img src={permaSeal} alt="Arcademy Perma Seal" />

      </div>

      <p>
        &copy; 2022 Created for {" "}
        <a
          href="https://twitter.com/ArweaveNews"
          target="_blank"
          rel="noopener noreferrer"
          className="textNoDec"
        >

          Arweave Devs
        </a>

      </p>
    </footer>
  );
}

export default Footer;