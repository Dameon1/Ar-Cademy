import React from "react";
import { Link } from "react-router-dom";

export function NavLinks () {
  return (
    <nav className="site-nav">
    <ul>
      <li>
        <Link className="nav-link" to="/Ar-Cademy">
          Home
        </Link>
      </li>
      <li>
        <span> | </span>
      </li>
      <li>
        <Link className="nav-link" to="/Ar-Cademy/dashboard">
          Dashboard
        </Link>
      </li>
    </ul>
  </nav>
  );
}