import React from "react";
import { NavLinks } from "./NavLinks";
import "./MainHeader.css";
import { Link } from "react-router-dom";

export function MainHeader() {
  return (
      <header className="main-header">
        <NavLinks />
        <h1 className="site-logo">Arcademy</h1>
        <div className="form-redirect-container">
          <Link to="/Ar-Cademy/identity">
            <button
              className="form-redirect-link"
            >
              {"Identity"}
            </button>
          </Link>
        </div>
      </header>
    );
    }

