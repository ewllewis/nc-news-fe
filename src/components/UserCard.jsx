import { useState } from "react";
import UserLoginModal from "./UserLoginModal.jsx";
import "../styles/UserCard.css";
import defaultIcon from "../assets/user-icon.jpg";
import { useUser } from "../context/User.jsx";

function UserCard() {
  const [showModal, setShowModal] = useState(false);
  const { loggedInUser, isLoggedIn } = useUser();

  return (
    <div className="user-card-container">
      <section className="user-card-avatar-container">
        {isLoggedIn ? (
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username}'s avatar`}
          />
        ) : (
          <img src={defaultIcon} alt="Default user icon" />
        )}
      </section>
      <section className="user-card-username">
        {isLoggedIn ? (
          "@" + loggedInUser.username
        ) : (
          <button
            onClick={() => setShowModal(true)}
            aria-label="Open login modal"
          >
            Login
          </button>
        )}
      </section>
      {showModal && <UserLoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UserCard;
