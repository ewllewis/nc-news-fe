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
      <figure className="user-card-avatar-container">
        {isLoggedIn ? (
          <img src={loggedInUser.avatar_url} alt="user-icon" />
        ) : (
          <img src={defaultIcon} alt="user-icon" />
        )}
      </figure>
      <div className="user-card-username">
        {isLoggedIn ? (
          "@" + loggedInUser.username
        ) : (
          <button onClick={() => setShowModal(true)}>Login</button>
        )}
      </div>
      {showModal && <UserLoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UserCard;
