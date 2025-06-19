import "./styles/CommentList.css";

import { useState, useEffect } from "react";

//api
import { getCommentsbyArticleId, postComment } from "../../api";

//components
import CommentCard from "./CommentCard";
import Button from "../../components/Button";
import NewCommentModal from "../../components/modals/NewCommentModal";

//hooks
import useLoading from "../../hooks/useLoading";
import { useUser } from "../../context/User";

function CommentList({ articleid, comment_count }) {
  const {
    isLoading,
    error,
    data: loadedComments = [],
  } = useLoading(getCommentsbyArticleId, articleid);

  const [commentCount, setCommentCount] = useState(Number(comment_count));
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loggedInUser, isLoggedIn } = useUser();

  function handleNewComment(newComment) {
    postComment(articleid, newComment)
      .then((commentFromAPI) => {
        setNewComments((curr) => [commentFromAPI, ...curr]);
        setCommentCount((currentCount) => currentCount + 1);
        setIsModalOpen(false);
      })
      .catch(() => {
        alert("Failed to post comment. Try again.");
      });
  }

  function handleDelete(commentId) {
    setComments((curr) => curr.filter((c) => c.comment_id !== commentId));
    setNewComments((curr) => curr.filter((c) => c.comment_id !== commentId));
    setCommentCount((currentCount) => Math.max(currentCount - 1, 0));
  }

  useEffect(() => {
    if (!isLoading) {
      setComments([...newComments, ...loadedComments]);
    }
  }, [isLoading, loadedComments, newComments]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="comment-list-container">
      <section className="comment-metadata-and-button">
        <h2>Comments ({commentCount})</h2>
        {!isLoggedIn ? (
          <div className="login-reminder">Log in to add a comment</div>
        ) : (
          <Button
            className="add-comment-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Comment
          </Button>
        )}

        {isModalOpen && (
          <NewCommentModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleNewComment}
            loggedInUser={loggedInUser}
          />
        )}
      </section>

      {comments.length === 0 ? (
        <p className="no-comments-message">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default CommentList;
