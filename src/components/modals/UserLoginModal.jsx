import { useState } from "react";

//api
import { getUserbyUsername } from "../../api";

//styles
import "./styles/modal.css";

//hooks
import { useUser } from "../../context/User";

//components
import Button from "../Button";

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
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <div>
              <div className="input-title">Username:</div>
              <input
                type="text"
                placeholder="Type here..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {errorMessage && (
                <p style={{ color: "red", marginTop: "0.5rem" }}>
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <section className="modal-action-buttons">
            <Button type="submit">Log in</Button>
            <Button onClick={onClose}>Cancel</Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default UserLoginModal;
