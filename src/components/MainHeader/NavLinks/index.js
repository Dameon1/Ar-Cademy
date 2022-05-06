import React from "react";

export function NavLinks () {
  return (
    <nav className="site-nav">
    <ul>
      <li onClick={() => (window.location.href = `/Ar-Cademy`)}>
        <div className="nav-link" to="/dashboard/explore">
          Home
        </div>
      </li>
      <li>
        <span> | </span>
      </li>
      <li onClick={() => (window.location.href = `/Ar-Cademy/account`)}>
        <div className="nav-link" to="/dashboard">
          Account
        </div>
      </li>
    </ul>
  </nav>
  );
}