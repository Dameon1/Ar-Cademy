import React from "react";
import "./Footer.css";
import permaSeal from "../../light.png"

export function Footer() {

  return (
    <footer className="main-footer">
      <div className="permaSeal">
        <img src={permaSeal} alt="Arcademy Perma Seal" />

      </div>

      <p className="pText">
        &copy;2023 {" "}
        <a
          href="https://arweave.news/"
          target="_blank"
          rel="noopener noreferrer"
          className="textNoDec "
        >

          @Arweave News
          
          
       
        </a>
        
      </p>
    </footer>
  );
}

export default Footer;