import "../styles/Header.css";

import logo from "../assets/logo.png";
import UserCard from "./UserCard";

import { Link } from "react-router";

function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <img className="logo" src={logo} alt="NC News Logo" />
      </Link>
      <section className="header-usercard">
        <UserCard />
      </section>
    </header>
  );
}

export default Header;
