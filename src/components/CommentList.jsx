import "../styles/CommentList.css";

import { getCommentsbyArticleId } from "../api";

import CommentCard from "./CommentCard";
import useLoading from "../hooks/useLoading";

function CommentList({ articleid }) {
  const {
    isLoading,
    error,
    data: comments = [],
  } = useLoading(getCommentsbyArticleId, articleid);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="comment-list-container">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
