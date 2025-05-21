import logo from "../assets/logo.png";
import { Link } from "react-router";

function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <img className="logo" src={logo} alt="NC News Logo" />
      </Link>
      <button className="log-in-button">Log in</button>
    </header>
  );
}

export default Header;
