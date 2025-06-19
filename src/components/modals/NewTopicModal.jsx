import { useState } from "react";

//api
import { postTopic } from "../../api";

//styles
import "./styles/modal.css";

//components
import Button from "../Button";

function NewTopicModal({ onClose }) {
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ slug: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await postTopic(slug.toLowerCase(), description);
      setSlug("");
      setDescription("");
      setErrors({ slug: "", description: "" });
      onClose();
    }
  };

  function validate() {
    const newErrors = { slug: "", description: "" };
    if (slug.trim().length < 3) {
      newErrors.slug = "Topic must be at least 3 characters.";
    }
    if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }
    setErrors(newErrors);
    return !newErrors.slug && !newErrors.description;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>New Topic</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <div>
              <div className="input-title">Topic:</div>

              <input
                type="text"
                placeholder="Type here..."
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
              {errors.slug && (
                <div id="slug-error" className="error-message">
                  {errors.slug}
                </div>
              )}
            </div>
            <div>
              <div className="input-title">Description:</div>
              <textarea
                placeholder="Type here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                aria-describedby="description-error"
                className={errors.description ? "input-error" : ""}
              />
              {errors.description && (
                <div id="description-error" className="error-message">
                  {errors.description}
                </div>
              )}
            </div>
          </div>

          <section className="modal-action-buttons">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default NewTopicModal;
