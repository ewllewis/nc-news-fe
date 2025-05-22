import "../styles/CommentList.css";

import { getCommentsbyArticleId } from "../api";
import CommentCard from "./CommentCard";
import useLoading from "../hooks/useLoading";

function CommentList({ articleid, newComments = [] }) {
  const {
    isLoading,
    error,
    data: comments = [],
  } = useLoading(getCommentsbyArticleId, articleid);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>{error.message}</p>;

  const allComments = [...newComments, ...comments];

  return (
    <div className="comment-list-container">
      {allComments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
