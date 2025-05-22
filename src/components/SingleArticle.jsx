import "../styles/SingleArticle.css";
import { useParams } from "react-router";
import { useState } from "react";
import { getArticlebyArticleId, patchArticleVotes, postComment } from "../api";

import CommentList from "./CommentList";
import useLoading from "../hooks/useLoading";
import useVotes from "../hooks/useVotes";
import NewCommentModal from "./NewCommentModal";

function SingleArticle() {
  const { articleid } = useParams();
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
      <header className="single-article-main">
        <section className="single-article-data">
          <h1 className="single-article-title">{article.title}</h1>
          <figure className="single-article-img">
            <img src={article.article_img_url} alt={article.title} />
          </figure>
          <section className="single-article-body">
            <p>{article.body}</p>
          </section>
        </section>

        <hr className="single-article-divider" />

        <aside className="single-article-right">
          <section className="single-article-metadata">
            <p className="article-card-metadata">#{article.topic}</p>
            <p className="article-card-metadata">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p className="article-card-metadata">@{article.author}</p>
          </section>

          <section className="single-article-votes-comments">
            <div className="vote-comment-counts">
              <p>
                <strong>Votes:</strong> {votes}
              </p>
              <p>
                <strong>Comments:</strong> {article.comment_count}
              </p>
            </div>

            <section className="article-actions">
              <button onClick={() => vote(1)} disabled={isVoting || hasVoted}>
                👍
              </button>
              <button onClick={() => vote(-1)} disabled={isVoting || hasVoted}>
                👎
              </button>
            </section>

            <button
              onClick={() => setIsModalOpen(true)}
              className="article-new-comment-button"
            >
              New Comment
            </button>
          </section>
        </aside>
      </header>

      <section>
        {isModalOpen && (
          <NewCommentModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleNewComment}
          />
        )}

        <section className="single-article-comments">
          <CommentList articleid={articleid} newComments={newComments} />
        </section>
      </section>
    </article>
  );
}

export default SingleArticle;
