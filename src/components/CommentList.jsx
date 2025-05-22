import CommentCard from "./CommentCard";
import { getCommentsbyArticleId } from "../api";
import { useState, useEffect } from "react";
import "../styles/CommentList.css";

function CommentList({ articleid }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsbyArticleId(articleid).then((comments) => {
      setComments(comments);
    });
  }, []);
  return (
    <div className="comment-list-container">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
