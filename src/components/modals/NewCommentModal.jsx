import { useState } from "react";

//styles
import "./styles/modal.css";

//components
import Button from "../Button";

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
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>New Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <div>
              <div className="input-title">Comment:</div>

              <textarea
                placeholder="Type here..."
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
          </div>
          <div className="modal-action-buttons">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCommentModal;
