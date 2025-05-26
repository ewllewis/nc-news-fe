import useVotes from "../hooks/useVotes";
import { useUser } from "../context/User";
import { patchCommentVotes, deleteComment } from "../api";

function CommentCard({ comment, onDelete }) {
  const { loggedInUser, isLoggedIn } = useUser();

  const { votes, vote, isVoting, hasVoted } = useVotes(
    comment?.votes ?? 0,
    comment?.comment_id ?? 0,
    patchCommentVotes
  );

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
        <section className="comment-card-voting">
          {!isLoggedIn ? (
            <div className="login-reminder">Login to vote</div>
          ) : (
            <>
              <button onClick={() => vote(1)} disabled={isVoting || hasVoted}>
                👍
              </button>
              <button onClick={() => vote(-1)} disabled={isVoting || hasVoted}>
                👎
              </button>
            </>
          )}{" "}
          <p className="comment-card-votes">Votes: {votes}</p>
        </section>

        {comment.author === loggedInUser?.username && (
          <section className="comment-card-delete">
            <button onClick={onDeleteButtonClick}>Delete</button>
          </section>
        )}
      </footer>
    </article>
  );
}

export default CommentCard;
