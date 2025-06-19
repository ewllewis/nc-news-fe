import { useParams } from "react-router";
import { useState } from "react";

//api
import {
  getArticlebyArticleId,
  patchArticleVotes,
  deleteArticle,
} from "../../api";

//styles
import "./styles/Article.css";

//hooks
import useLoading from "../../hooks/useLoading";
import useVotes from "../../hooks/useVotes";
import { useUser } from "../../context/User";

//components
import Button from "../../components/Button";
import VoteButton from "../../components/VoteButton";

function Article({ article_id }) {
  const { loggedInUser, isLoggedIn } = useUser();

  const {
    isLoading,
    error,
    data: article = {},
  } = useLoading(getArticlebyArticleId, article_id);

  const { votes, vote, isVoting, hasVoted } = useVotes(
    article?.votes ?? 0,
    article?.article_id ?? 0,
    patchArticleVotes
  );

  async function onDeleteButtonClick() {
    try {
      await deleteArticle(article_id);
    } catch (err) {
      alert("Failed to delete article. Try again.");
    }
  }

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <section className="article-container">
      <h1 className="article-title">{article.title}</h1>

      <section className="article-details">
        <p>#{article.topic}</p>
        <p>{new Date(article.created_at).toLocaleDateString()}</p>
        <p>@{article.author}</p>

        {!isLoggedIn ? (
          <div className="login-reminder">Login to vote</div>
        ) : (
          <>
            <VoteButton articleId={article_id} initialVotes={article.votes} />
            {article.author === loggedInUser?.username && (
              <section className="article-delete">
                <Button onClick={onDeleteButtonClick}>Delete</Button>
              </section>
            )}
          </>
        )}
      </section>
      <img
        className="article_img"
        src={article.article_img_url}
        alt={article.title}
      />

      <section className="article-body">
        <p>{article.body}</p>
      </section>
    </section>
  );
}

export default Article;
