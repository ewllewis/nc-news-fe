import useVotes from "../hooks/useVotes";

import { patchCommentVotes } from "../api";

function CommentCard({ comment }) {
  const { votes, vote, isVoting, hasVoted } = useVotes(
    comment?.votes ?? 0,
    comment?.comment_id ?? 0,
    patchCommentVotes
  );

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
        <div className="comment-card-vote-buttons">
          <button onClick={() => vote(1)} disabled={isVoting || hasVoted}>
            👍
          </button>
          <button onClick={() => vote(-1)} disabled={isVoting || hasVoted}>
            👎
          </button>
        </div>
      </footer>
    </article>
  );
}

export default CommentCard;
