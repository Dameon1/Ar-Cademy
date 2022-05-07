import React from "react";
import { Link } from "react-router-dom";

export function NavLinks () {
  return (
    <nav className="site-nav">
    <ul>
      <li>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li>
        <span> | </span>
      </li>
      <li>
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
    </ul>
  </nav>
  );
}