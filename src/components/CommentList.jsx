import "../styles/CommentList.css";

import { useState, useEffect } from "react";

import { getCommentsbyArticleId } from "../api";
import CommentCard from "./CommentCard";
import useLoading from "../hooks/useLoading";

function CommentList({ articleid, newComments = [] }) {
  const {
    isLoading,
    error,
    data: loadedComments = [],
  } = useLoading(getCommentsbyArticleId, articleid);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!isLoading && loadedComments.length) {
      setComments([...newComments, ...loadedComments]);
    }
  }, [isLoading, loadedComments, newComments]);

  useEffect(() => {
    setComments((curr) => [
      ...newComments,
      ...curr.filter(
        (c) => !newComments.some((nc) => nc.comment_id === c.comment_id)
      ),
    ]);
  }, [newComments]);

  function handleDelete(commentId) {
    setComments((curr) => curr.filter((c) => c.comment_id !== commentId));
  }

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="comment-list-container">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CommentList;
