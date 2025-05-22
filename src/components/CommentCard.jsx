function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <div className="comment-card-data">
        <div className="comment-card-author">@{comment.author}</div>
        <div className="comment-card-body">{comment.body}</div>
      </div>
      <div className="comment-card-metadata">
        <div className="comment-card-date">
          {new Date(comment.created_at).toLocaleDateString()}
        </div>
        <div className="comment-card-votes">Votes: {comment.votes}</div>
        <div className="comment-card-vote-buttons">
          <button className="comment-card-button">Upvote</button>
          <button className="comment-card-button">Downvote</button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
