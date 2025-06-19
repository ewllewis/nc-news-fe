import { Link } from "react-router";
import { useState } from "react";

//hooks
import { useUser } from "../../context/User.jsx";

//styles
import "./styles/Header.css";

//assets
import logo from "../../assets/logo-light.png";
import defaultIcon from "../../assets/user-icon.jpg";

//components
import HeaderDate from "../../components/HeaderDate";
import Button from "../../components/Button";
import UserLoginModal from "../../components/modals/UserLoginModal.jsx";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const { loggedInUser, isLoggedIn, setLoggedInUser, setIsLoggedIn } =
    useUser();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoggedIn(null);
    setLoggedInUser(null);
  }

  return (
    <header className="header-container">
      <Link to="/">
        <img className="logo" src={logo} alt="NC News Logo" />
      </Link>
      <section className="header-section-right">
        <div className="header-date">
          <HeaderDate />
        </div>
        <section className="header-login">
          <section className="avatar-container">
            {isLoggedIn ? (
              <img
                src={loggedInUser.avatar_url}
                alt={`${loggedInUser.username}'s avatar`}
              />
            ) : (
              <img
                className="avatar-img"
                src={defaultIcon}
                alt="Default user icon"
              />
            )}
          </section>
          <section className="login-buttons">
            {isLoggedIn ? (
              <Button onClick={handleSubmit}>Log out</Button>
            ) : (
              <Button
                onClick={() => setShowModal(true)}
                aria-label="Open log in modal"
              >
                Log in
              </Button>
            )}
          </section>
          {showModal && <UserLoginModal onClose={() => setShowModal(false)} />}
        </section>
      </section>
    </header>
  );
}

export default Header;
