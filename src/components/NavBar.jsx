import "../styles/Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function NavBar() {
  const [showTopics, setShowTopics] = useState(false);
  const navigate = useNavigate();

  function handleTopicClick(path) {
    setShowTopics(false);
    navigate(path);
  }

  return (
    <>
      {showTopics && (
        <div
          className="nav-overlay-backdrop"
          onClick={() => setShowTopics(false)}
        />
      )}

      <nav
        className="nav-bar-wrapper"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-bar-container">
          <div className="nav-bar-left-section">
            <Link to="/articles/new">
              <button className="nav-bar-button">New</button>
            </Link>
            <Link to="/articles/popular">
              <button className="nav-bar-button">Popular</button>
            </Link>
          </div>

          <div className="nav-bar-right-section">
            <button
              className="nav-bar-button nav-toggle"
              onClick={() => setShowTopics((prev) => !prev)}
            >
              Topics ▾
            </button>

            <div className={`nav-topics-dropdown ${showTopics ? "show" : ""}`}>
              <button
                onClick={() => handleTopicClick("/articles/coding")}
                className="nav-bar-button"
              >
                #coding
              </button>
              <button
                onClick={() => handleTopicClick("/articles/football")}
                className="nav-bar-button"
              >
                #football
              </button>
              <button
                onClick={() => handleTopicClick("/articles/cooking")}
                className="nav-bar-button"
              >
                #cooking
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
