import { useState } from "react";

import "../styles/NewCommentModal.css";

function NewCommentModal({ onClose, onSubmit, loggedInUser }) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ username: "", body: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await onSubmit({ username: loggedInUser.username, body });
      setBody("");
      setIsSubmitting(false);
    }
  };

  function validate() {
    const newErrors = { body: "" };
    if (body.trim().length < 5) {
      newErrors.body = "Comment must be at least 5 characters.";
    }
    setErrors(newErrors);
    return !newErrors.body;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <textarea
              placeholder="Your comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              aria-describedby="body-error"
              className={errors.body ? "input-error" : ""}
            />
            {errors.body && (
              <div id="body-error" className="error-message">
                {errors.body}
              </div>
            )}
          </div>
          <div className="modal-buttons">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCommentModal;
