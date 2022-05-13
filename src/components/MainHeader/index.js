import React from "react";
import { NavLinks } from "../NavLinks";
import { Link } from "react-router-dom";

export function MainHeader() {
  return (
    <header className="main-header">
      <NavLinks />
      <h1 className="site-logo">Arcademy</h1>

      <div className="form-redirect-container">
        <Link to="/Ar-Cademy/identity" className="form-redirect-link">
          {"Identity"}
        </Link>
      </div>
    </header>
  );
}

