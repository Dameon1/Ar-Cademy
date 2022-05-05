import React from "react";
import { NavLinks } from "./NavLinks";
import "./MainHeader.css";


export function MainHeader() {
  return (
      <header className="main-header">
        <NavLinks />
        <h1 className="site-logo">Arcademy</h1>
        <div className="form-redirect-container">
          <button
            className="form-redirect-link"
            onClick={() => (window.location.href = `/identity`)}
          >
            {"Identity"}
          </button>
        </div>
      </header>
    );
    }

