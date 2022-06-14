import { Link } from "react-router-dom";

export function NavLinks() {
  return (
    <nav className="site-nav">
      <ul>
        {/* <li>
          <Link className="nav-link" to={-1}>back</Link>
        </li> */}
        <li>
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {/* <li>
          <Link className="nav-link" to="/Ar-Cademy/test">test</Link>
        </li> */}
        <li>
          <Link className="nav-link" to="/Dashboard">Dashboard</Link>
        </li>

      </ul>

    </nav>
  );
}