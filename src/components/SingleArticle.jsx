import "../styles/SingleArticle.css";
import { useParams } from "react-router";
import { useState } from "react";
import { getArticlebyArticleId, patchArticleVotes, postComment } from "../api";

import CommentList from "./CommentList";
import useLoading from "../hooks/useLoading";
import useVotes from "../hooks/useVotes";
import NewCommentModal from "./NewCommentModal";
import { useUser } from "../context/User";

function SingleArticle() {
  const { articleid } = useParams();
  const { loggedInUser, isLoggedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComments, setNewComments] = useState([]);

  function handleNewComment(newComment) {
    postComment(articleid, newComment)
      .then((commentFromAPI) => {
        setNewComments((curr) => [commentFromAPI, ...curr]);
        setIsModalOpen(false);
      })
      .catch(() => {
        alert("Failed to post comment. Try again.");
      });
  }

  const {
    isLoading,
    error,
    data: article = {},
  } = useLoading(getArticlebyArticleId, articleid);

  const { votes, vote, isVoting, hasVoted } = useVotes(
    article?.votes ?? 0,
    article?.article_id ?? 0,
    patchArticleVotes
  );

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <article className="single-article-container">
      <section className="single-article-main">
        <section className="single-article-header">
          <h1 className="single-article-title">{article.title}</h1>
          <div className="single-article-metadata">
            <p>#{article.topic}</p>
            <p>{new Date(article.created_at).toLocaleDateString()}</p>
            <p>@{article.author}</p>
          </div>
        </section>

        <section className="single-article-votes-and-comments">
          <section className="single-article-votes-and-comments-data">
            <p>
              <strong>Votes:</strong> {votes}
            </p>
            <p>
              <strong>Comments:</strong> {article.comment_count}
            </p>
          </section>
          <section className="single-article-actions">
            {!isLoggedIn ? (
              <div className="single-article-login-reminder">Login to vote</div>
            ) : (
              <>
                <button onClick={() => vote(1)} disabled={isVoting || hasVoted}>
                  👍
                </button>
                <button
                  onClick={() => vote(-1)}
                  disabled={isVoting || hasVoted}
                >
                  👎
                </button>
                <button onClick={() => setIsModalOpen(true)}>+ Comment</button>
              </>
            )}
          </section>
        </section>

        <section className="single-article-img">
          <img src={article.article_img_url} alt={article.title} />
        </section>

        <section className="single-article-body">
          <p>{article.body}</p>
        </section>
      </section>

      <section className="single-article-comments">
        {isModalOpen && (
          <NewCommentModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleNewComment}
            loggedInUser={loggedInUser}
          />
        )}

        <CommentList articleid={articleid} newComments={newComments} />
      </section>
    </article>
  );
}

export default SingleArticle;
