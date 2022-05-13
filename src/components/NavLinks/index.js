import React from "react";
import { Link } from "react-router-dom";

export function NavLinks() {
  return (
    <nav className="site-nav">
      <ul>
        <li>
          <Link className="nav-link" to={-1}>back</Link>
        </li>
        <li>
          <Link className="nav-link" to="/Ar-Cademy/test">test</Link>
        </li>
        {/* <li>
          <Link className="nav-link" to="/Ar-Cademy/dashboard">Dashboard</Link>
        </li> */}
        <li>
          <Link className="nav-link" to="/Ar-Cademy">Home</Link>
        </li>
      </ul>

    </nav>
  );
}