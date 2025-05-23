import "../styles/navbar.css";

import { Link } from "react-router";

function NavBar() {
  return (
    <nav
      className="nav-bar-wrapper"
      role="navigation"
      aria-label="Main navigation"
    >
      <hr className="horizontal-divider" />
      <div className="nav-bar-container">
        <div className="nav-bar-left-section">
          <Link to="/articles/new">
            <button className="nav-bar-button">New</button>
          </Link>
          <Link to="/articles/popular">
            <button className="nav-bar-button">Popular</button>
          </Link>
        </div>
        <div className="nav-divider" />
        <div className="nav-bar-right-section">
          <Link to="/articles/coding">
            <button className="nav-bar-button">#coding</button>
          </Link>
          <Link to="/articles/football">
            <button className="nav-bar-button">#football</button>
          </Link>
          <Link to="/articles/cooking">
            <button className="nav-bar-button">#cooking</button>
          </Link>
        </div>
      </div>
      <hr className="horizontal-divider" />
    </nav>
  );
}

export default NavBar;
