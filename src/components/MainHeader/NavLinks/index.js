import React from "react";

export function NavLinks () {
  return (
    <nav className="site-nav">
    <ul>
      <li onClick={() => (window.location.href = `/Ar-Cademy`)}>
        <div className="nav-link" to="/Ar-Cademy/dashboard/explore">
          Home
        </div>
      </li>
      <li>
        <span> | </span>
      </li>
      <li onClick={() => (window.location.href = `/Ar-Cademy/dashboard`)}>
        <div className="nav-link" to="/Ar-Cademy/dashboard">
          Dashboard
        </div>
      </li>
    </ul>
  </nav>
  );
}