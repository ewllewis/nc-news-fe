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
      <section className="comment-card-data">
        <header className="comment-card-author">@{comment.author}</header>
        <p className="comment-card-body">{comment.body}</p>
      </section>
      <footer className="comment-card-metadata">
        <time className="comment-card-date" dateTime={comment.created_at}>
          {new Date(comment.created_at).toLocaleDateString()}
        </time>
        <div className="comment-card-votes">Votes: {votes}</div>
        <section className="comment-card-actions">
          {!isLoggedIn ? (
            <div className="login-reminder">Please login to vote</div>
          ) : (
            <>
              <section className="comment-card-voting">
                <button onClick={() => vote(1)} disabled={isVoting || hasVoted}>
                  👍
                </button>
                <button
                  onClick={() => vote(-1)}
                  disabled={isVoting || hasVoted}
                >
                  👎
                </button>
              </section>

              {comment.author === loggedInUser?.username && (
                <section className="comment-card-delete">
                  <button onClick={onDeleteButtonClick}>Delete comment</button>
                </section>
              )}
            </>
          )}
        </section>
      </footer>
    </article>
  );
}

export default CommentCard;
