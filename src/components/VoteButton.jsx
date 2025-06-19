import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import useVotes from "../hooks/useVotes";
import { patchArticleVotes, patchCommentVotes } from "../api";
import "./styles/VoteButton.css";

function VoteButton({
  className = "",
  articleId,
  commentId,
  initialVotes = 0,
}) {
  const isArticle = Boolean(articleId);
  const voteTargetId = articleId || commentId;
  const patchFunction = isArticle ? patchArticleVotes : patchCommentVotes;

  const { votes, vote, isVoting, hasVoted } = useVotes(
    initialVotes,
    voteTargetId,
    patchFunction
  );

  return (
    <div className="vote-button-container">
      <button
        onClick={() => vote(1)}
        className={`vote-button ${className} ${
          hasVoted === 1 ? "upvoted" : ""
        }`}
        disabled={isVoting || hasVoted !== 0}
        aria-label="Upvote"
      >
        <AiFillCaretUp />
      </button>

      <div className="votes">{votes}</div>

      <button
        onClick={() => vote(-1)}
        className={`vote-button ${className} ${
          hasVoted === -1 ? "downvoted" : ""
        }`}
        disabled={isVoting || hasVoted !== 0}
        aria-label="Downvote"
      >
        <AiFillCaretDown />
      </button>
    </div>
  );
}

export default VoteButton;
