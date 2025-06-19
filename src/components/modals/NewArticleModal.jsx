import { useState, useEffect } from "react";

//api
import { postTopic, postArticle, getTopics } from "../../api";

//styles
import "./styles/modal.css";

//components
import Button from "../Button";

//hooks
import { useUser } from "../../context/User";
import useLoading from "../../hooks/useLoading";

function NewArticleModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { loggedInUser } = useUser();
  const { isLoading, error, data: topics } = useLoading(getTopics);
  const [errors, setErrors] = useState({ slug: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await postArticle(
        loggedInUser.username,
        title,
        body,
        topic.toLowerCase(),
        imageUrl
      );
      setTitle("");
      setBody("");
      setTopic("");
      setImageUrl("");
      setErrors({ title: "", body: "", topic: "", imageUrl: "" });
      onClose();
    }
  };

  function validate() {
    const newErrors = { title: "", body: "", topic: "", imageUrl: "" };
    if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }
    if (body.trim().length < 10) {
      newErrors.body = "Body must be at least 10 characters.";
    }
    if (topic.trim().length < 3) {
      newErrors.topic = "Topic must be at least 3 characters.";
    }
    if (imageUrl.trim().length < 10) {
      newErrors.imageUrl = "Image Url must be at least 10 characters.";
    }
    setErrors(newErrors);
    return (
      !newErrors.title &&
      !newErrors.body &&
      !newErrors.topic &&
      !newErrors.imageUrl
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>New Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-inputs">
            <div>
              <div className="input-title">Title:</div>
              <input
                type="text"
                placeholder="Type here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.title && (
                <div id="title-error" className="error-message">
                  {errors.title}
                </div>
              )}
            </div>
            <div>
              <div className="input-title">Article Body:</div>
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
            <div>
              <div className="input-title">Topic:</div>
              <select
                className="select"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                {topics.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.slug}
                  </option>
                ))}
              </select>
              {errors.topic && (
                <div id="topic-error" className="error-message">
                  {errors.topic}
                </div>
              )}
            </div>
            <div>
              <div className="input-title">Article Image Url:</div>
              <input
                type="text"
                placeholder="Type here..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              {errors.imageUrl && (
                <div id="imageUrl-error" className="error-message">
                  {errors.imageUrl}
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

export default NewArticleModal;
