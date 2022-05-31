import React from "react";
import { NavLinks } from "../NavLinks";
import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch";


export function MainHeader() {
  return (
    <header className="main-header">
      <NavLinks />
      <h1 className="site-logo">Arcademy</h1>
      <div className="form-redirect-container">
        <Link to="/identity" className="form-redirect-link">
          {"Identity"}
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  );
}

