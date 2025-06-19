import { patchCommentVotes, deleteComment } from "../../api";

//styles
import "./styles/CommentCard.css";

//hooks
import useVotes from "../../hooks/useVotes";
import { useUser } from "../../context/User";

//components
import VoteButton from "../../components/VoteButton";
import Button from "../../components/Button";

function CommentCard({ comment, onDelete }) {
  const { loggedInUser, isLoggedIn } = useUser();

  async function onDeleteButtonClick() {
    try {
      await deleteComment(comment.comment_id);
      onDelete(comment.comment_id);
    } catch (err) {
      alert("Failed to delete comment. Try again.");
    }
  }

  return (
    <article className="comment-card">
      <header className="comment-card-header">
        <p className="comment-card-author">@{comment.author}</p>
        <time className="comment-card-date" dateTime={comment.created_at}>
          {new Date(comment.created_at).toLocaleDateString()}
        </time>
      </header>

      <p className="comment-card-body">{comment.body}</p>

      <footer className="comment-card-actions">
        {!isLoggedIn ? (
          <div className="login-reminder">Login to vote</div>
        ) : (
          <>
            {comment.author === loggedInUser?.username && (
              <section className="comment-card-delete">
                <Button onClick={onDeleteButtonClick}>Delete</Button>
              </section>
            )}

            <VoteButton
              commentId={comment.comment_id}
              initialVotes={comment.votes}
            />
          </>
        )}
      </footer>
    </article>
  );
}

export default CommentCard;
