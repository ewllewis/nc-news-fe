function CommentCard({ comment }) {
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
        <div className="comment-card-votes">Votes: {comment.votes}</div>
        <div className="comment-card-vote-buttons">
          <button className="comment-card-button">Upvote</button>
          <button className="comment-card-button">Downvote</button>
        </div>
      </footer>
    </article>
  );
}

export default CommentCard;
