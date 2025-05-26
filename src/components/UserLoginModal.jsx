import { useState } from "react";
import { useUser } from "../context/User";
import { getUserbyUsername } from "../api";

import "../styles/UserLoginModal.css";

function UserLoginModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoggedInUser, setIsLoggedIn } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    try {
      const user = await getUserbyUsername(username);
      if (user) {
        setLoggedInUser(user);
        setIsLoggedIn(true);
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("User not found. Please check the username.");
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{errorMessage}</p>
          )}
          <section className="modal-buttons">
            <button type="submit">Log In</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default UserLoginModal;
